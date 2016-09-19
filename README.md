
While it's fun keeping documentation and the code to which it refers to together, docs need to get out and about to be useful. This small tool
will retrieve and index docs from a GitHub repository.

## Development

Faxx is compiled with Babel, `src` => `dist`.

- `$ npm run build`

_Will watch and rebuild_

## Usage

### Make `faxx` part of your build process.



### Import indexed documentation
```
import docs from './docs '
```

###

### Structure

```
├── src
│   ├── catalog.js          # Index
│   ├── download.js         # Download
│   ├── github.js           # GitHub
│   ├── index.js            # Glue
│   ├── local.js            # Local
│   ├── options.js          # Options
│   ├── output.js           # Output
│   └── spinners.js         # Spinners
├── dist                    # Compiled files
├── docs                     
└── bin
```
