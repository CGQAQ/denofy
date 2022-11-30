const rollup = require("rollup");
const fs = require("node:fs");
const path = require("node:path");

const inputOptions = {
    input: "src/index.js",
    external: ["node:fs", "lodash"],
    plugins: [
        require("rollup-plugin-node-resolve")(),
        require("rollup-plugin-commonjs")(),
    ],
};

const denofy = async (options) => {
    if (!options) {
        options = {};
    }

    let {root, entry, isCommonJs, target, module: module_, outdir, strict} = options;
    if (!root) {
        root = __dirname;
    }

    if (!entry) {
        entry = "index.js"
    }

    if (!isCommonJs) {
        const packageJson = path.join(root, "package.json");
        if (fs.existsSync(packageJson)) {
            let content = fs.readFileSync(packageJson, {encoding: "utf-8"});
            content = JSON.parse(content);
            // global isCommonJs: use package.json to determine.
            isCommonJs = content.type !== "module"; 
        } else {
            isCommonJs = true;
        }
    }

    if (!target) {
        target = "esnext";
    }

    if (!module_) {
        module_ = "esm"; // generate esm or cjs
    }

    if (!outdir) {
        outdir = path.join(root, "dist");
    }

    if (!strict) {
        strict = true;
    }

    const bundle = await rollup.rollup(inputOptions);
    await bundle.generate({
        format: module === "cjs" ? "cjs" : "esm",
        exports: "auto",
        preserveModules: true,
        preserveModulesRoot: root,
        dir: outdir,
        strict
    });
}


module.exports = denofy;