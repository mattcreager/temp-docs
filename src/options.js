
export default {
  'in-dir': {
    alias: 'i',
    default: '/docs',
    describe: 'Specify path to docs',
    type: 'string',
  },
  'out-dir': {
    alias: 'o',
    describe: 'Specify output directory',
    type: 'string',
    demand: true,
  },
  'local': {
    alias: 'l',
    describe: 'Specify local path to docs',
    type: 'string',
  },
  'repo': {
    alias: 'r',
    describe: 'Specify GitHub repo',
    type: 'string',
  },
  'watch': {
    alias: 'w',
    describe: 'Watch and rebuild local',
    default: 'false',
  },
  'help': {
    alias: 'h',
  },
};
