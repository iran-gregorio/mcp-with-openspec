## 1. Project Setup and Scaffolding

- [x] 1.1 Create the valueray-mcp-server package directory and initialize `package.json`
- [x] 1.2 Install required dependencies (`@modelcontextprotocol/sdk`, `zod`, `typescript`, `@types/node`)
- [x] 1.3 Create `tsconfig.json` for TypeScript compilation targeting Node 22

## 2. Server Core Implementation

- [x] 2.1 Implement the main server entrypoint and `TOKEN_SERVICE` validation logic
- [x] 2.2 Configure the MCP `Server` and `StdioServerTransport`
- [x] 2.3 Implement a helper function for authenticated Valueray API requests using `fetch`

## 3. Tool Implementations

- [x] 3.1 Define the Zod schema and implement the `symbol-data` tool handler
- [x] 3.2 Define the Zod schema and implement the `symbol-peers` tool handler
- [x] 3.3 Define the Zod schema and implement the `market-regime` tool handler
- [x] 3.4 Wire up the handlers to the MCP server's `CallToolRequestSchema`

## 4. Final Polish and Build

- [x] 4.1 Update `package.json` scripts (build, start, dev)
- [x] 4.2 Validate compilation and manually test the server using standard input/output
