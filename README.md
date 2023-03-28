# Jest + Node Modules Problems

The "babel fix" for Jest does not work for imported npm modules if they are of type ESM.

## Cannot import npm packages that are of type ESM.

### Example 1 -- node-fetch

```text
~/dev/jest-babel-delme/node_modules/node-fetch/src/index.js:9
import http from 'node:http';
^^^^^^

SyntaxError: Cannot use import statement outside a module

  1 | jest.mock("node-fetch");
> 2 | import fetch from "node-fetch";
    | ^
  3 | import { fetchJson } from "../fetch.js";
  4 |
  5 | describe("fetchJson", () => {

  at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1495:14)
  at Object.require (src/__tests__/fetch.test.js:2:1)
```

### Example 2 -- mem

```text
~/dev/jest-babel-delme/node_modules/mem/dist/index.js:1
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import mimicFn from 'mimic-fn';
                                                                                  ^^^^^^

SyntaxError: Cannot use import statement outside a module

> 1 | import mem from "mem";
    | ^
  2 |
  3 | const maxAge = 1000 * 60 * 60 * 24; // 24 hours
  4 |

  at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1495:14)
  at Object.require (src/memoize.js:1:1)
  at Object.require (src/__tests__/memoize.test.js:1:1)
```

## --experimental-vm-modules

Runninng `node --experimental-vm-modules node_modules/.bin/jest` causes other problems:

```text
 FAIL  src/__tests__/fetch.test.js
  ● Test suite failed to run

    ReferenceError: require is not defined

    > 1 | jest.mock("node-fetch");
        |                         ^
      2 | import fetch from "node-fetch";
      3 | import { fetchJson } from "../fetch.js";
      4 |

      at require (src/__tests__/fetch.test.js:1:25)
      at _getJestObj (src/__tests__/fetch.test.js:1:1)

 FAIL  src/__tests__/memoize.test.js
  ● memoize › should call the function once

    ReferenceError: jest is not defined

      3 | describe("memoize", () => {
      4 |   it("should call the function once", () => {
    > 5 |     const fn = jest.fn();
        |                ^
      6 |     const memoized = memoize(fn);
      7 |
      8 |     memoized("foo");

      at Object.jest (src/__tests__/memoize.test.js:5:16)
```

This can be tested with the command:

```sh
npm run test:esm
```

## Downgrade Makes all the tests pass

Downgrade node_modules to pre ESM.

```sh
# downgrade mem and node-fetch
npm i mem@8 node-fetch@2

# run tests
npm test
```

Now all tests pass

```text
PASS  src/__tests__/basic.test.js
PASS  src/__tests__/memoize.test.js
PASS  src/__tests__/fetch.test.js
```
