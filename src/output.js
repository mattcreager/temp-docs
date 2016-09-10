
import path from 'path';
import output from 'tar-fs';
import _ from 'lodash';

const DEFAULT_OPTS = {
  dmode: '0555', // all dirs and files should be readable
  ignore: function(name, header) {
    return path.extname(name) !== '.md' // ignore anything except markdown
  },
};

const LOCAL_OPTS = {
  dmode: '0555',
  ignore: function(name, header) {
    return path.extname(name) !== '.md'
  },
};

export default function (outDir, catalog, version) {
    const local = version === 'local';
    const opts = local ? LOCAL_OPTS : DEFAULT_OPTS;

    if (local) {
      opts.map = (header) => {
        header.name = `local/${header.name}`;

        catalog.add(version, 'local', header.name, header);
        return header
      };
    }

    if (!local) {
      opts.map = (header) => {
        let name = header.name.split('/');

        name[0] = _.last(name[0].split('-'));


        catalog.add(version, name[0], header.name, header);

        header.name = _.reduce(name, (n, seg) => {
          if (seg === 'docs') return n;

          return `${n}/${seg}`;
        }, '');

        return header;
      };
    }

    return output.extract(outDir, opts);
};
