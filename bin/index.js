#!/usr/bin/env node

const denofy = require("../src/index.js");
const { Command } = require("commander");
const path = require("node:path");

const cmd = new Command();

cmd.option(
    "-r, --root <root>",
    "root directory of the project that contains package.json",
    process.cwd()
);

// node project default is commonjs
cmd.option("-m, --esm-source", "whether the project is ESM");

// deafult is esnext
cmd.option("-t, --target <target>", "target of the gen code", "esnext");

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

cmd.argument("<entry>", "entry file of the project");

cmd.parse(process.argv);

const options = cmd.opts();
const [entry] = cmd.args;
options.entry = entry;
if (typeof options.entry === "string" && !path.isAbsolute(options.entry)) {
    options.entry = path.resolve(options.root, options.entry);
}

const outputEntry = path.resolve(
    options.outdir,
    path.relative(process.cwd(), entry)
);

denofy(options)
    .then(() => {
        console.log("Convert succeed!");
        console.log("Converted files are in", options.outdir);
        console.log(`try: \n\tdeno run --allow-all ${outputEntry}`);
    })
    .catch((err) => {
        console.error(err);
    });
