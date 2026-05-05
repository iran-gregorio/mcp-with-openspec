import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { valuerayRequest } from "./valueray.js";

const server = new McpServer({
  name: "valueray-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "symbol-data",
  {
    description:
      "Provides comprehensive technical, fundamental, risk, and sentiment data for a specific financial symbol. Rate limit: 30 requests/hour.",
    inputSchema: {
      symbol: z.string().describe("The financial symbol to retrieve data for (e.g., AAPL)"),
      exchange: z.string().optional().describe("Optional exchange code (e.g., NASDAQ)"),
    },
  },
  async ({ symbol, exchange }) => {
    const queryParams: Record<string, string> = { symbol };
    if (exchange) queryParams.exchange = exchange;
    try {
      const data = await valuerayRequest("/symbolData", queryParams);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "symbol-peers",
  {
    description:
      "Retrieves ranking and financial metrics for peers within the same industry or group. Rate limit: 30 requests/hour.",
    inputSchema: {
      symbol: z.string().describe("The financial symbol to retrieve peers for (e.g., AAPL)"),
      exchange: z.string().optional().describe("Optional exchange code (e.g., NASDAQ)"),
    },
  },
  async ({ symbol, exchange }) => {
    const queryParams: Record<string, string> = { symbol };
    if (exchange) queryParams.exchange = exchange;
    try {
      const data = await valuerayRequest("/symbolPeers", queryParams);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "market-regime",
  {
    description:
      "Retrieves the current market regime status and metrics based on broader market indicators. Rate limit: 5 requests/hour (data updates end-of-day).",
    inputSchema: {},
  },
  async () => {
    try {
      const data = await valuerayRequest("/marketRegime");
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Valueray MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
