## Context

We are building an MCP (Model Context Protocol) server for Valueray. This server will run as a standalone process and expose tools to AI agents using the standard MCP API, enabling agents to retrieve financial data (symbol data, peers, market regime) from the Valueray API. The server will act as a proxy or bridge, making authenticated HTTP requests to Valueray and formatting the responses. The project uses TypeScript, Node.js 22, and the official `@modelcontextprotocol/sdk`.

## Goals / Non-Goals

**Goals:**
- Provide a robust, typed MCP server exposing three main tools: `symbol-data`, `symbol-peers`, and `market-regime`.
- Connect securely to the Valueray API using the `TOKEN_SERVICE` environment variable.
- Guarantee that the service fails fast if `TOKEN_SERVICE` is missing or empty.
- Map the OpenAPI specifications of Valueray to well-typed tool inputs and outputs.

**Non-Goals:**
- Client implementation (the MCP SDK handles standard clients; we just build the server).
- Caching of Valueray API responses (Valueray rate limits apply, but caching logic is deferred unless necessary).
- Comprehensive UI or complex configuration systems (pure CLI/stdio based server).

## Decisions

- **Framework**: Use `@modelcontextprotocol/sdk` to standardise the implementation of the MCP server, specifically utilizing its `StdioServerTransport` for standard IO communication, which is common for MCP servers invoked directly by agents.
- **Language**: TypeScript with strict typing. The input arguments for tools will be validated using Zod, ensuring that inputs from the LLM match what the Valueray API expects.
- **Validation**: Enforce the `TOKEN_SERVICE` environment variable at the very start of the application. The server initialization process will check `process.env.TOKEN_SERVICE` and `throw Error` or `process.exit(1)` immediately with an informative error message if absent.
- **API Client**: Use standard `fetch` API available natively in Node.js 22 to interact with Valueray, keeping dependencies minimal.
- **Project Structure (Mixed Layered)**: Keep a clean entrypoint (`index.ts`) for server lifecycle logic, a centralized `valueray.ts` for API and Auth logic, and encapsulate individual tools inside a `tools/` directory containing both the Zod schemas and their respective handlers.

## Risks / Trade-offs

- **Risk: Rate Limits** → The Valueray API has strict rate limits (e.g., 30 requests/hour for symbol data). 
  - *Mitigation*: Ensure the MCP tools include descriptive error handling to inform the AI agent when a rate limit is hit, preventing rapid retry loops. Document limits clearly in the tool descriptions so the LLM understands the constraint.
- **Risk: Complex Responses** → The Valueray OpenAPI schema is complex and returns a lot of data. AI context windows could be overwhelmed.
  - *Mitigation*: Return the JSON data directly, but we might consider filtering or summarizing only the most relevant sections if we discover context limits are a problem. For now, we will return the full response from the Valueray API as standard JSON.
