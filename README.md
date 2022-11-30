# Convert your node code into deno

## Still work in progress and a long way to PoC

## See demo (after git clone)

```console
yarn install
cd example
yarn start
```

## Idea

-   Map npm dep `foo` to `npm:foo`
-   Map node builtins `fs` to `https://deno.land/std/node/fs.ts`
-   Gen import_maps.json in `non-inline` mode
-   Inject `createRequrie` code from `https://deno.land/std/node/module.ts` in commonjs gen mode
-   Keep folder structure and don't minify the code for now

## TODO

-   [ ] Support gen node code + import_maps
-   [ ] Support gen deno code (inline mode)
-   [x] Support esm gen
-   [ ] ~~Support commonjs gen + createRequire (deno commonjs shim mode) IMPOSSIBLE~~
