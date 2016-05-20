/*
**  grunt-i18next-yaml -- Grunt Task for I18N File Assembling
**  Copyright (c) 2013-2016 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module:  false */
module.exports = function (grunt) {
    /* global require: false */
    var chalk = require("chalk");

    grunt.registerMultiTask("i18next-yaml",
        "Assemble language-separated i18next JSON output files from language-merged YAML input files", function () {

        /*  prepare options  */
        var options = this.options({
            encoding: "utf8",
            language: "en",
            replacer: null,
            space: "\t"
        });
        grunt.verbose.writeflags(options, "Options");

        /*  iterate over all src-dest file pairs  */
        this.files.forEach(function (f) {
            try {
                /*  start with a fresh message container  */
                var msgs = {};

                /*  iterate over all src files  */
                f.src.forEach(function (src) {
                    if (!grunt.file.exists(src))
                        throw "Source file \"" + chalk.red(src) + "\" not found.";
                    else {
                        /*  read source YAML file  */
                        var obj = grunt.file.readYAML(src, { encoding: options.encoding });

                        /*  extract the requested translation  */
                        grunt.util._.forEach(obj, function (trans, comp) {
                            if (typeof trans[options.language] !== "undefined")
                                msgs[comp] = trans[options.language];
                        });
                    }
                });

                /*  write destination JSON file  */
                var txt = JSON.stringify(msgs, options.replacer, options.space);
                grunt.file.write(f.dest, txt, { encoding: options.encoding });
                grunt.log.writeln("File \"" + chalk.green(f.dest) + "\" created.");
            }
            catch (e) {
                grunt.fail.warn(e);
            }
        });
    });
};

