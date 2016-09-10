
import index1 from './/index.md';
import andAnother2 from './commands/and-another.md';
import another3 from './commands/another.md';
import index4 from './commands/index.md';
import lastOne5 from './commands/last-one.md';
import anotherMajor6 from './internals/another-major.md';
import anotherMinor7 from './internals/another-minor.md';
import index8 from './internals/index.md';
import index9 from './quickstart/index.md';
import moarQuickstart10 from './quickstart/moar-quickstart.md';
import index11 from './tutorials/index.md';
import tutorialsIn_1_212 from './tutorials/tutorials-in-1-2.md';

export default [
  {
    path: '/',
    content: index1,
    meta: {
      slug: 'index',
      title: 'Index',
    },
  },
  {
    path: '/commands/and-another',
    content: andAnother2,
    meta: {
      slug: 'and-another',
      title: 'And Another',
    },
  },
  {
    path: '/commands/another',
    content: another3,
    meta: {
      slug: 'another',
      title: 'Another',
    },
  },
  {
    path: '/commands',
    content: index4,
    meta: {
      slug: 'index',
      title: 'Index',
    },
  },
  {
    path: '/commands/last-one',
    content: lastOne5,
    meta: {
      slug: 'last-one',
      title: 'Last One',
    },
  },
  {
    path: '/internals/another-major',
    content: anotherMajor6,
    meta: {
      slug: 'another-major',
      title: 'Another Major',
    },
  },
  {
    path: '/internals/another-minor',
    content: anotherMinor7,
    meta: {
      slug: 'another-minor',
      title: 'Another Minor',
    },
  },
  {
    path: '/internals',
    content: index8,
    meta: {
      slug: 'index',
      title: 'Index',
    },
  },
  {
    path: '/quickstart',
    content: index9,
    meta: {
      slug: 'index',
      title: 'Index',
    },
  },
  {
    path: '/quickstart/moar-quickstart',
    content: moarQuickstart10,
    meta: {
      slug: 'moar-quickstart',
      title: 'Moar Quickstart',
    },
  },
  {
    path: '/tutorials',
    content: index11,
    meta: {
      slug: 'index',
      title: 'Index',
    },
  },
  {
    path: '/tutorials/tutorials-in-1-2',
    content: tutorialsIn_1_212,
    meta: {
      slug: 'tutorials-in-1-2',
      title: 'Tutorials In 1 2',
    },
  },
];