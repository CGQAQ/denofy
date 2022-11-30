const denofy = require("../src/index.js");
const { Command } = require("commander");
const path = require("node:path");

const cmd = new Command();

cmd.option(
    "-r, --root <root>",
    "root directory of the project that contains package.json",
    process.cwd()
);

cmd.option(
    "-e, --entry <entry>",
    "entry file of the project",
    path.resolve(process.cwd(), "./index.js")
);

cmd.option("-M, --esm-source", "whether the project is ESM");

cmd.option("-t, --target <target>", "target of the gen code", "esnext");

cmd.option("-m, --module <module>", "module of the gen code", "esm");

cmd.option(
    "-o, --outdir <outdir>",
    "output directory of the project gen code",
    path.resolve(process.cwd(), "./dist")
);

cmd.option("-s, --strict", "whether to use strict mode", true);

// Change import statement to deno style by default
// specify --no-inline to disable this feature and keep import statement
// untouched. By use import_map.json instead.
cmd.option(
    "-n, --no-inline",
    "whether to use import_map.json instead of inline import map into import statement"
);

cmd.parse(process.argv);

const options = cmd.opts();

denofy(options)
    .then(() => {
        console.log("Convert succeed!");
    })
    .catch((err) => {
        console.error(err);
    });
