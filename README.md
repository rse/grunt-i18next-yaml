
# grunt-i18next-yaml

Grunt Plugin for assembling language-separated [i18next](http://i18next.com/) JSON output files from language-merged YAML input files.

<p/>
<img src="https://nodei.co/npm/grunt-i18next-yaml.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/grunt-i18next-yaml.png" alt=""/>

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/)
before, be sure to check out the [Getting
Started](http://gruntjs.com/getting-started) guide, as it explains how
to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process,
you may install this plugin with this command:

```shell
npm install grunt-i18next-yaml --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-i18next-yaml");
```

## Task Options

- `encoding`: (default `utf8`) the character encoding to use for reading the YAML and writing the JSON files.

- `language`: (default `en`) the language to extract from the YAML source files and to write to the JSON destination file.

- `replacer`: (default `null`) the 2nd argument to `JSON.stringify()` when serializing the JSON destination file content.

- `space`: (default `\t`) the 3nd argument to `JSON.stringify()` when serializing the JSON destination file content.

## Usage Example

With the following input files...

- `src/foo/foo.i18n.yaml`:

```yaml
foo:
    en:
        title: The Foo Component
        sub-title: The best Component ever
    de:
        title: Die Foo Komponente
        sub-title: Die beste Komponente, die es je gab
```

- `src/bar/bar.i18n.yaml`:

```yaml
bar:
    en:
        title: The Bar Component
        sub-title: The worst Component ever
    de:
        title: Die Foo Komponente
        sub-title: Die schlechteste Komponente, die es je gab
```

...and this Grunt build configuration...

- `Gruntfile.js`:

```js
// [...]
grunt.initConfig({
    "i18next-yaml": {
        "en": {
            src: "src/**/*.i18n.yaml",
            dest: "build/app.i18n-en.json",
            options: { language: "en" }
        },
        "de": {
            src: "src/**/*.i18n.yaml",
            dest: "build/app.i18n-de.json",
            options: { language: "de" }
        }
    }
});
// [...]
```

...you will get the following output files:

- `build/app.i18n-en.json`:

```json
{
    "foo": {
        "title": "The Foo Component",
        "sub-title": "The best Component ever"
    "bar": {
        "title": "The Bar Component",
        "sub-title": "The worst Component ever"
    }
}
```

- `build/app.i18n-de.json`:

```json
{
    "foo": {
        "title": "Die Foo Komponente",
        "sub-title": "Die beste Komponente, die es je gab"
    },
    "bar": {
        "title": "Die Foo Komponente",
        "sub-title": "Die schlechteste Komponente, die es je gab"
    }
}
```

