import { z } from "zod";
import { valuerayRequest } from "../valueray.js";

export const MarketRegimeSchema = z.object({});

export const marketRegimeHandler = async () => {
  try {
    const data = await valuerayRequest("/marketRegime");
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
