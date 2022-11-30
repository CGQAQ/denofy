# Convert your node code into deno

## Still work in progress and a long way to PoC

## Idea

-   Map npm dep `foo` to `npm:foo`
-   Map node builtins `fs` to `https://deno.land/std/node/fs.ts`
-   gen import_maps.json in `non-inline` mode
-   inject `createRequrie` code from `https://deno.land/std/node/module.ts` in commonjs gen mode

## TODO

-   [ ] support gen node code + import_maps
-   [ ] support gen deno code (inline mode)
-   [ ] support esm gen
-   [ ] support commonjs gen + createRequire (deno commonjs shim mode)
