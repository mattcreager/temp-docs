
import tar from 'tar-fs';
import Promise from 'bluebird';

export default function (localPath) {
  let localTar = new Promise((resolve, reject) => {
    let local = tar.pack(localPath);

    local.on('error', reject);

    return resolve(local);
  });

  return {
    name: 'local',
    tar: localTar
  };
}
