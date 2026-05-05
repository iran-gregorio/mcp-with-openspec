## ADDED Requirements

### Requirement: Retrieve Market Regime
The server MUST expose a `market-regime` tool that returns the current market regime status and metrics by calling the Valueray `/marketRegime` endpoint.

#### Scenario: Agent requests market regime data
- **WHEN** the `market-regime` tool is called
- **THEN** the server makes an authenticated GET request to `https://www.valueray.com/api/v1/marketRegime`
- **THEN** the server returns the JSON payload containing market regime data to the agent.
