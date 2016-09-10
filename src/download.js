
import Promise from 'bluebird'
import dl from 'download';
import gunzip from 'gunzip-maybe';

export default function (release) {
  return new Promise((resolve, reject) => {
    let tar = dl(release).pipe(gunzip());

    tar.on('error', reject);

    resolve(tar);
  });
}
