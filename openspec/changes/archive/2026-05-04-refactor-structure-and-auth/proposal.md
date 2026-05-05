## Why

The current structure nests the MCP server inside a `valueray-mcp-server` subdirectory, which is redundant. We need to elevate the project files to the root directory for a cleaner structure. Additionally, the `TOKEN_SERVICE` environment variable is no longer necessary for this server and should be removed to simplify initialization.

## What Changes

- **BREAKING**: Remove the `TOKEN_SERVICE` requirement. The server will no longer validate or use this environment variable during startup or API requests.
- Move all files from `valueray-mcp-server/` (`package.json`, `tsconfig.json`, `src/`) to the repository root.
- Remove the `valueray-mcp-server` directory.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `server-core`: Remove the requirement to validate API Token on startup.

## Impact

- Project root will now contain the Node.js application files.
- `src/valueray.ts` and `src/index.ts` will be simplified to remove auth checking.
- Users no longer need to provide `TOKEN_SERVICE` in their environment.
