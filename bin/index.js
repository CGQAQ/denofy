const denofy = require('../src/index.js');
const {Command} = require("commander");
const path = require("node:path");

const cmd = new Command();

cmd.option("-r, --root <root>", "root directory of the project that contains package.json", process.cwd());

cmd.option("-e, --entry <entry>", "entry file of the project", "index.js");

cmd.option("-c, --commonjs", "whether the project is commonjs", true);

cmd.option("-t, --target <target>", "target of the gen code", "esnext");

cmd.option("-m, --module <module>", "module of the gen code", "esm");

cmd.option("-o, --outdir <outdir>", "output directory of the project gen code", path.resolve(process.cwd(), "./dist"));

cmd.option("-s, --strict", "whether to use strict mode", true);

cmd.parse(process.argv);

const options = cmd.opts();

denofy(options).then(() => {
    console.log("Convert succeed!");
}).catch((err) => {
    console.error(err);
});
