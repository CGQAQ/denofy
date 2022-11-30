const rollup = require("rollup");
const fs = require("node:fs");
const path = require("node:path");

const denofy = async (options) => {
    options = options ?? {};
    let {
        root,
        entry,
        esmSource: isEsmSource,
        target,
        module: module_,
        outdir,
        strict,
        noInline,
    } = options;
    if (!root) {
        root = __dirname;
    }

    if (!entry) {
        entry = path.resolve(root, "./index.js");
    }

    if (isEsmSource == null) {
        const packageJson = path.join(root, "package.json");
        if (fs.existsSync(packageJson)) {
            let content = fs.readFileSync(packageJson, { encoding: "utf-8" });
            content = JSON.parse(content);
            // global isCommonJs: use package.json to determine.
            isEsmSource = content.type == "module";
        } else {
            isEsmSource = false;
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

    noInline = !!noInline;

    const bundle = await rollup.rollup({
        input: entry,
        plugins: [
            require("rollup-plugin-node-externals")(),
            require("rollup-plugin-node-resolve")(),
            !isEsmSource ? require("rollup-plugin-commonjs")() : null,
            require("./rollup-plugin-denofy")({ noInline }),
        ],
    });

    await bundle.write({
        dir: outdir,
        format: module_,
        strict,
        preserveModules: true, // Keep directory structure and files
    });
};

module.exports = denofy;
