# Incognito Wallet - Browser Extension

## Development

```
yarn install
yarn start
```

**Note** You can safely discard the browser page opening on `localhost:3000` (we tried to disable it but did not succeed yet)

In this mode, each time you save a file, development server will re-compile the files and you can
simply reload to see the changes (no need to unload).

For background page, from the `Inspect` view, simply hit reload shortcut (`⌘-R` on Apple, or `Ctrl-R`). For the popup,
either close it and re-open or from `Inspect` view, hit reload shortcut (same as above).

### Add extension to Chrome

**Important** Unload any previously loaded Incognito Wallet extension, only one extension can be loaded at one time.

- Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked"
- Browse to this project `./dist`, hit select

### Open Extensions Pages (Chrome only)

You can open background and popup page (in full view) using simply:

```
./bin/open_ext.sh <extension_id>
```

Where `<extension_id>` is the value reported by Chrome Extension manager for you loaded unpacked extension.
To ease your life, you can also define `INCOGNITO_EXTENSION_ID` as an enviornment variable and it will be use as
the default value for `<extension_id>` parameter, so you can do `./bin/open_ext.sh`.

## Production

```
yarn install
yarn build
```

### Add extension to Chrome

**Important** Unload any previously loaded Solana Wallet extension, only one extension can be loaded at one time.

- Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked"
- Browse to this project `./build`, hit select

## Configuring IDE

### Prettier

This project expects all contributors to have a suitable format on save that uses Prettier
config to run.

Follow the links IDE to fromat on save using Prettier:

- [VSCode](https://prettier.io/docs/en/editors.html#visual-studio-code)
- [WebStorm](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher)
- [Emacs](https://prettier.io/docs/en/editors.html#emacs)
- [Vim](https://prettier.io/docs/en/editors.html#vim)
- [Others](https://prettier.io/docs/en/editors.html)

## Enable debug

- Open chrome dev tools (background, popup or content-script)
- Go to Application
- Add a Local Storage entry: Key:debug, Value:\*

## Disable JS minification

`config.optimization.minimize = false` in `rewire-webex.js`
