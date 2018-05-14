# DnD Druid Wild Shape Worksheet Builder

> Easily fill in a sheet with SRD beast information for quick reference

background details relevant to understanding what this module does

## Usage

```bash
# Install dependencies
npm install
# Start a local dev server
npm run serve
# Lint the JavaScript
npm run lint
# Build a version to deploy
npm run build
```

## Deploy

With [npm](https://npmjs.org/) installed, from the root directory of the repo, run

```bash
$ npm install
$ npm run build
```

This will create a `dist/` directory. Upload the contents of the `dist/` directory to an HTTP server and the tool will be running.

## Build Creature Data

With [npm](https://npmjs.org/) installed, from the root directory of the repo, run

```bash
$ npm ./bin/scrape-creature-data.js
```

This will create the `data/beasts.json` file fresh from [https://5thsrd.org](5thsrd.org).

## Acknowledgments

This tool wouldn't exist without glumlord's (Joshua Fredrickson) amazing Druid Wild Shape sheet.
It is available for download on [https://www.reddit.com/r/dndnext/comments/35vtyv/druid_wildshape_reference_sheet_is_there_a/](Reddit) 
and on [http://www.enworld.org/forum/rpgdownloads.php?do=download&downloadid=1266](EN World).

While the creature information is licensed under OGL, the copy of the information used was pulled from [https://5thsrd.org](5thsrd.org).

## License

Creature information is licensed under the Open Gaming License (OGL) v1.0a

Code is licensed under MIT