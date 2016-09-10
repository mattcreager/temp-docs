
import dust from 'dustjs-linkedin';
import fs from 'fs';
import path from 'path';
import changeCase from 'change-case';
import _ from 'lodash';
import Promise from 'bluebird';

let render = Promise.promisify(dust.render);
let writeFile = Promise.promisify(fs.writeFile);
let src = fs.readFileSync(path.resolve(__dirname, '../templates/template.dust'));
let tmpl = dust.compile(src.toString(), "hello");

dust.loadSource(tmpl);

class Catalog {

  constructor() {
    this.headers = {};
    this.versions = {};
  }

  add(version, folder, filename) {
    this.versions[folder] = version;
    this.headers[folder] = this.headers[folder] || [];

    if (path.extname(filename) !== '.md') return

    const dirname = path.dirname(filename).split('/').splice(1).join('/');
    const name = path.basename(filename, '.md');

    let doc = {
      folder,
      importName: _.uniqueId(changeCase.camel(name)),
      relativePath: `./${dirname}/${name}.md`,
      path: name === 'index' ? `/${dirname}` :  `/${dirname}/${name}`,
      meta: {
        slug: name,
        title: changeCase.title(name),
      },
    };

    this.headers[folder].push(doc);
  }

  print(dest) {
    let output = _.map(this.headers, (docs) => {
      return render('hello', { docs }).then((out) => {
        return writeFile(dest + `/${docs[0].folder}/index.js`, out);
      });
    });

    return Promise.all(output).then(() => {
      console.log('here are some versions', this.versions)

      let versionDoc = _.map(this.versions, (k, importName) => {
        return {
          importName,
          relativePath: `./${importName}`,
          content: importName
        };
      });

      return render('hello', { docs: versionDoc }).then((out) => {
        console.log('yo')
        return writeFile(dest, out);
      });
    });
  }
}

export default Catalog;
