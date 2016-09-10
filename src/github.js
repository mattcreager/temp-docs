
import GitHubAPI from 'github';
import GitHubCache from 'github-cache';
import gunzip from 'gunzip-maybe';
import semver from 'semver';
import _ from 'lodash';
import download from './download';
import spinners from './spinners';

const GITHUB_VERSION = '3.0.0';
const GITHUB_ENDPOINT = ' https://api.github.com';

let githubAPI = new GitHubAPI({
  version: GITHUB_VERSION,
  validateCache: true,
});

let github = new GitHubCache(githubAPI);

export default function getReleases(r) {
  return new Promise((resolve, reject) => {
    const [ user, repo ] = r.split('/');

    github.repos.getReleases({ user, repo }, (err, res) => {
      if (err) {
        spinners().error('fetch');
        reject(err);
      }

      spinners().success('fetch');
      const groupReleases = _.reduce(res, function(result, release) {
        if (!semver.valid(release.tag_name)) {
          console.warning(`${release.tag_name} is not valid semver, skipped`);
          return result;
        }

        const version = semver(release.tag_name);

        result[version.major] = result[version.major] || [];
        result[version.major].push(release);

        return result;
      }, {});

      // Include only the latest release of every major release
      let maxMajor = _.reduce(groupReleases, function(result, major) {
        let bigMajor = major.sort((a, b) => {
          return semver.rcompare(semver(a.tag_name), semver(b.tag_name));
        });

        const target = {
          name: bigMajor[0].tag_name,
          tar: download(bigMajor[0].tarball_url),
        };

        result.push(target);
        return result;
      }, []);

      const latestRelease = {
        name: 'latest',
        tar: download(`${GITHUB_ENDPOINT}/repos/${user}/${repo}/tarball/master`),
      };

      maxMajor.push(latestRelease);

      resolve(maxMajor);
    });
  });
}
