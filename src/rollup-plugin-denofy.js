const walk = require("estree-walker").walk;
const is_node_builtin = require("is-builtin-module");
const { default: MagicString } = require("magic-string");

const DENO_NODE_BUILTIN_SHIM = "https://deno.land/std/node/";

const normalizeDep = (mg, node) => {
    const dep = node.source.value.replace(/node:/, "");

    if (is_node_builtin(dep)) {
        // nodejs builtin module
        mg.update(
            node.source.start,
            node.source.end,
            `"${DENO_NODE_BUILTIN_SHIM}${dep}.ts"`
        );
    } else if (dep.startsWith("./") || dep.startsWith("../")) {
        // local file
        mg.update(node.source.start, node.source.end, `"${dep}"`);
    } else {
        // npm package
        mg.update(node.source.start, node.source.end, `"npm:${dep}"`);
    }
};

module.exports = function RollupPluginDenofy(options) {
    options = options || {};
    let { noInline } = options;

    return {
        name: "rollup-plugin-denofy",

        renderChunk(code, chunk) {
            // don't touch import statement in no inline mode
            if (noInline) return;

            if (!chunk.fileName.endsWith(".js")) {
                return null;
            }

            // transform code
            const ast = this.parse(code);
            const mg = new MagicString(code);

            walk(ast, {
                enter(node) {
                    if (node.type === "ImportDeclaration") {
                        normalizeDep(mg, node);
                    }
                },
            });

            return {
                code: mg.toString(),
                map: mg.generateMap({ hires: true }),
            };
        },
    };
};
