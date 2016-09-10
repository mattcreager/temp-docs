
While it's fun keeping documentation and the code to which it refers to together, docs need to get out and about to be useful. This small tool
will retrieve and index docs from a GitHub repository.

## Development

Ditto is compiled with babel

## Usage

### Make `doc-catcher` part of your build process.



### Import indexed documentation
```
import docs from './docs '
```

###

### Structure

```
├── src
│   ├── index.js            # Glue
│   ├── bin.js              # Execute
│   ├── local.js            # Monitor
│   ├── download.js         # Download
│   ├── catalog.js          # Index
│   ├── collate.js          # Collate
│   └── output.js           # Output
├── dist                    # Compiled files
├── docs                     
└── bin
```
