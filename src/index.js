
import Promise from 'bluebird';
import argv from 'yargs';
import _ from 'lodash';
import rimraf from 'rimraf';
import options from './options';
import output from './output';
import getReleases from './github';
import getLocal from './local';
import Catalog from './catalog';
import spinners from './spinners';

const rm = Promise.promisify(rimraf);
const { repo, local, inDir, outDir, watch } = argv
  .usage('Usage: $0 [options]')
  .example('$0 arigatomachine/cli -o docs', 'Download and index markdown')
  .options(options)
  .argv;

let catalog = new Catalog();

spinners().create('fetch', `Grabbing releases for ${repo} from GitHub`);

Promise.all([
  rm(outDir),
  getReleases(repo),
]).spread((rm, releases) => {
  if (local) {
    releases.push(getLocal(local));
  }

  spinners().create('download', `Downloading ${releases.length} releases`);
  spinners().create('print', `Indexing and extracting documentation to ${outDir}`);
  const extracted = _.map(releases, (release) => {
    return release.tar.then((tar) => {
      spinners().success('download');

      return new Promise((resolve, reject) => {
        tar
          .pipe(output(outDir, catalog, release.name))
          .on('finish', resolve)
          .on('error', reject);
      });
    });
  });

  return Promise.all(extracted).then(() =>  catalog);
}).then(() => {
  spinners().success('print');
  catalog.print(outDir);
});
// .then((map) => {
//   //  console.log('a map is here', map);
//   //  maybeWatch(opts);
//
//   //return catalog(map, outDir);
// });
