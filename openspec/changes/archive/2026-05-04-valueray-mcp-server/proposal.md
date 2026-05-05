## Why

We need to build a Model Context Protocol (MCP) server that interfaces with the Valueray API. This allows AI assistants to retrieve up-to-date and comprehensive financial asset information, including technical, fundamental, and market regime data, seamlessly during conversations.

## What Changes

- Create a new Node.js based MCP Server.
- Implement tools that correspond to the Valueray API endpoints.
- Require and validate the `TOKEN_SERVICE` environment variable for authentication.
- **New Capability**: Retrieve symbol data.
- **New Capability**: Retrieve peer symbol data.
- **New Capability**: Retrieve market regime data.

## Capabilities

### New Capabilities
- `symbol-data`: Provides comprehensive technical, fundamental, risk, and sentiment data for a specific financial symbol.
- `symbol-peers`: Retrieves ranking and financial metrics for peers within the same industry or group.
- `market-regime`: Retrieves the current market regime status and metrics based on broader market indicators.

### Modified Capabilities

## Impact

- Introduces a new standalone service: Valueray MCP Server.
- New dependencies for setting up an MCP server via `@modelcontextprotocol/sdk`.
- Will require configuring environments to securely pass `TOKEN_SERVICE` to the MCP Server.
- `server-core`: Core server initialization and authentication validation
