
import tar from 'tar-fs';
import Promise from 'bluebird';
import fs from 'fs';
import exit from 'exit';

const stat = Promise.promisify(fs.stat);

export default function (localPath) {
  return {
    name: 'local',
    tar: tarIt(localPath)
  };
}

function tarIt(path) {
  return stat(path).then((stat) => {
    return new Promise((resolve, reject) => {
      let local = tar.pack(path);

      local.on('error', reject);

      return resolve(local);
    });
  }).catch((err) => {
    console.log(`Not a valid directory: ${path}`)
    exit();
  })
}
