import { z } from "zod";
import { valuerayRequest } from "../valueray.js";

export const SymbolPeersSchema = z.object({
  symbol: z.string().describe("The financial symbol to retrieve peers for (e.g., AAPL)"),
  exchange: z.string().optional().describe("Optional exchange code"),
});

export const symbolPeersHandler = async (params: unknown) => {
  const { symbol, exchange } = SymbolPeersSchema.parse(params);
  
  const queryParams: Record<string, string> = { symbol };
  if (exchange) queryParams.exchange = exchange;

  try {
    const data = await valuerayRequest("/symbolPeers", queryParams);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      isError: false,
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
      isError: true,
    };
  }
};
