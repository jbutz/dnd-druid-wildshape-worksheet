# DnD Druid Wild Shape Worksheet Builder

[![Build Status](https://travis-ci.com/jbutz/dnd-druid-wildshape-worksheet.svg?branch=master)](https://travis-ci.com/jbutz/dnd-druid-wildshape-worksheet)

> Easily fill in a sheet with SRD beast information for quick reference

This project's purpose is two-fold. Firstly, it was a simple project to allow me to try out [Vue.js](https://vuejs.org/).
Secondly it makes filling out glumlord's druid wild shape sheet much easier.

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

This will create the `data/beasts.json` file fresh from [5thsrd.org](https://5thsrd.org).

## Acknowledgments

This tool wouldn't exist without glumlord's (Joshua Fredrickson) amazing Druid Wild Shape sheet.
It is available for download on [Reddit](https://www.reddit.com/r/dndnext/comments/35vtyv/druid_wildshape_reference_sheet_is_there_a/) 
and on [EN World](http://www.enworld.org/forum/rpgdownloads.php?do=download&downloadid=1266).

While the creature information is licensed under OGL, the copy of the information used was pulled from [5thsrd.org](https://5thsrd.org).

## License

Creature information is licensed under the Open Gaming License (OGL) v1.0a

Code is licensed under MIT