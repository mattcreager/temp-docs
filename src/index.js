
// Should we prompt them to pick a repo?
// do we need a really tiny cli library?

// doc-catcher mattcreager/project -d go/here

import GitHubAPI from 'github';
import GitHubCache from 'github-cache';
import fs from 'fs';
import download from 'download';
import tar from 'tar-fs';
import gunzip from 'gunzip-maybe';
import path from 'path';
import chokidar from 'chokidar';

const GITHUB_VERSION = '3.0.0';

const USER = 'mattcreager';
const REPO = 'temp-docs';

let githubAPI = new GitHubAPI({
  version: GITHUB_VERSION,
  validateCache: true,
});

let github = new GitHubCache(githubAPI);

let extract = tar.extract('docs-output', {
  dmode: '0555', // all dirs and files should be readable
  ignore: function(name, header) {
    return path.extname(name) !== '.md' // ignore anything except markdown
  },
  map: function(header) {
    console.log(header);
    header.name = header.name.replace('/docs/', '/');
    return header
  },
});

let extractLocal = tar.extract('docs-output', {
  dmode: '0555', // all dirs and files should be readable
  ignore: function(name, header) {
    return path.extname(name) !== '.md' // ignore anything except markdown
  },
  map: function(header) {
    header.name = `local/${header.name}`;
    return header
  },
});

github.repos.getTags({
  user: USER,
  repo: REPO,
  // ref: 'heads/master'
}, function(err, res) {
  // download('https://api.github.com/repos/mattcreager/temp-docs/tarball/master').pipe(gunzip()).pipe(extract).on('finish', function() {
  //   console.log('ya done')
  // });
  console.log(err, res) // JSON.stringify(res));
})

// Initialize watcher.
// let watcher = chokidar.watch('../cli/docs', {
//   ignored: /[\/\\]\./,
//   persistent: true
// });



// Something to use when events are received.
// let log = console.log.bind(console);
// Add event listeners.
// watcher
//   .on('add', path => log(`File ${path} has been added`))
//   .on('change', path => {
//     log(`File ${path} has been changed, lets extract`)
//     tar.pack('../cli/docs').pipe(extractLocal);
//   })
//   .on('unlink', path => log(`File ${path} has been removed`));

// let extract2 = tar.extract('docs-output', {
//   dmode: '0555', // all dirs and files should be readable
//   ignore: function(name, header) {
//     return path.extname(name) !== '.md' // ignore anything except markdown
//   },
//   map: function(header) {
//     console.log(header);
//     header.name = header.name.replace('/docs/', '/');
//     return header
//   },
// });


// get tags
// github.gitdata.getTags({
//   user: USER,
//   repo: REPO,
// }, function(err, res) {
//   // console.log(JSON.stringify(res));
//
//   github.repos.getReleaseByTag({
//     user: USER,
//     repo: REPO,
//     tag: 'v0.2.0'
//   }, function(err, res2) {
//     if (err) console.log(err);
//
//     // console.log(res2.tarball_url);
//
    // download('https://api.github.com/repos/mattcreager/temp-docs/tarball/master').pipe(gunzip()).pipe(extract).on('finish', function() {
    //   console.log('ya done')
    // });
//
//       github.gitdata.getTags({
//         user: USER,
//         repo: REPO,
//       }, function(err, res) {
//         // console.log(JSON.stringify(res));
//
//         github.repos.getReleaseByTag({
//           user: USER,
//           repo: REPO,
//           tag: 'v0.1.0'
//         }, function(err, res2) {
//           if (err) console.log(err);
//
//           // console.log(res2.tarball_url);
//
//           download(res2.tarball_url).pipe(gunzip()).pipe(extract2).on('finish', function() {
//             console.log('ya done')
//           });
//         })
//       });
//     });
//   })
// });
// also need to fetch the latest sha?
