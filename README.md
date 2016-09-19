# Faxx

It's fun keeping docs and the code to which it refers together, but docs need to get out and about to be useful! Faxx teleports docs from a GitHub repository to wherever you heart desires.

###  📠   = 📃  ✨  📃

## Development

Faxx is compiled with Babel, `src` => `dist`.

- `$ npm run build`

_Will watch and rebuild by default._

## Usage

### Install it everywhere

- `$ npm i -g faxx`

### Make `faxx` part of your build process.

- `$ npm i --save-dev faxx`

### Teleportation

- `$ faxx -r manifold/torus -o app/docs`

### Keep an eye on a local docs directory

- `$ faxx -l ../manifold/torus -o app.docs`

_See `--help` for additional options._

### Import indexed documentation

Once the documentation is where you needed it, just import it.

```
import docs from './docs '
```

_This assumes you're using `babel-raw` in tandem with some sort of md => ? transpiler._

## Structure

```
├── src
│   ├── catalog.js          # Index documentation
│   ├── download.js         # Download tars from GitHub
│   ├── github.js           # Fetch GitHub releases
│   ├── index.js            # Glue everything together
│   ├── local.js            # Local watch and build
│   ├── options.js          # Options
│   ├── output.js           # Output to fs
│   └── spinners.js         # Spinners (even sometimes work)
├── dist                    # Compiled files
├── docs
└── bin
```

## Roadmap

- [ ] Much needed refactor
- [ ] Better (any) error messages
- [ ] Serve fetched documentation
- [ ] Examples, and better documentation
