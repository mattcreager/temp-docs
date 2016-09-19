'use strict';

import Promise from 'bluebird';
import argv from 'yargs';
import _ from 'lodash';
import rimraf from 'rimraf';
import chokidar from 'chokidar';
import options from './options';
import output from './output';
import getReleases from './github';
import getLocal from './local';
import Catalog from './catalog';
import spinners from './spinners';
import exit from 'exit';

const rm = Promise.promisify(rimraf);
const { repo, local, inDir, outDir, watch } = argv
  .usage('Usage: $0 [options]')
  .example('$0 arigatomachine/cli -o docs', 'Download and index markdown')
  .options(options)
  .argv;

let catalog = new Catalog();

let init = [ rm(outDir) ];

if (repo) {
  spinners().create('fetch', `Grabbing releases for ${repo} from GitHub`);
  init.push(getReleases(repo));
}

Promise.all(init).spread((rm, releases) => {
  releases = releases || [];

  if (local) {
    releases.push(getLocal(local));
  }

  spinners().create('download', `Downloading ${releases.length} releases`);
  spinners().create('extract', `Extracting documentation to ${outDir}`);
  const extracted = _.map(releases, (release) => {
    return release.tar
      .then((tar) => {
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
  spinners().success('extract');
  spinners().create('print', `Indexing docs in ${outDir}`);
  return catalog.print(outDir);
}).then((map) => {
  spinners().success('print');

  if (watch) {
    let watcher = chokidar.watch(local, {
      ignored: /[\/\\]\./,
      persistent: true
    });

    watcher
      .on('change', updateLocal)
      .on('unlink', path => log(`File ${path} has been removed`));
  }

  function updateLocal(path) {
    rm(`${outDir}/local`)
      .then(() => {
        spinners().create('watch', `File ${path} has been changed, re-building local`);
        return getLocal(local).tar;
      })
      .then((tar) => {
        return new Promise((resolve, reject) => {
          tar
            .pipe(output(`${outDir}/local`, catalog, 'local '))
            .on('finish', resolve)
            .on('error', reject);
        }).then(() => {
          return catalog.print(outDir);
        })
      })
      .then(() => {
        spinners().success('watch');
      }).catch((err) => {
        console.log('what happened?', err);
      })
  }
});
