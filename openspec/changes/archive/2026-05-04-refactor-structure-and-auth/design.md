## Context

The Valueray MCP Server was initially built inside a `valueray-mcp-server` subfolder and required a `TOKEN_SERVICE` environment variable. We are refactoring the directory structure to place all Node.js server files directly in the repository root for better access and cleaner configuration. Concurrently, the `TOKEN_SERVICE` requirement is being removed as it is deemed unnecessary for the current deployment architecture.

## Goals / Non-Goals

**Goals:**
- Simplify project structure by elevating `package.json`, `tsconfig.json`, and `src/` to the repository root.
- Simplify configuration by removing the `TOKEN_SERVICE` environment variable validation and usage.

**Non-Goals:**
- Changing the functionality of the `symbol-data`, `symbol-peers`, or `market-regime` tools. They should continue working as before (just without the Bearer token header).

## Decisions

- **File Move**: Use Git or bash commands to move `valueray-mcp-server/*` to `./`. This flattens the hierarchy.
- **Auth Removal**: Remove the `requireToken()` function from `src/valueray.ts`. Remove the `Authorization` header from the `fetch` call to Valueray. Remove the startup validation check in `src/index.ts`.

## Risks / Trade-offs

- **Risk: Build paths** → Moving `tsconfig.json` and `package.json` to the root might cause minor path issues if we had hardcoded paths. 
  - *Mitigation*: We will verify `npm run build` works in the root after moving files.
- **Risk: Valueray API Auth** → Valueray might reject requests without an Authorization header if it changes its policy. 
  - *Mitigation*: If Valueray requires a token later, we can easily revert the auth removal. Currently, it's known to not be necessary for the usage scope.
