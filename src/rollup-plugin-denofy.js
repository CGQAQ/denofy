module.exports = function RollupPluginDenofy(options) {
    let {} = options;

    return {
        name: "rollup-plugin-denofy",
        transform(code, id) {
            if (id.endsWith(".js")) {
                return {
                    code: code.replace(
                        /module\.exports\s*=\s*{/,
                        "export default {"
                    ),
                    map: null,
                };
            }
        },
    };
};
