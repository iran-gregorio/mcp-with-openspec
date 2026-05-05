## ADDED Requirements

### Requirement: Retrieve Symbol Data
The server MUST expose a `symbol-data` tool that retrieves technical, fundamental, risk, and sentiment data for a specific financial symbol by calling the Valueray `/symbolData` endpoint.

#### Scenario: Agent requests data for a valid symbol
- **WHEN** the `symbol-data` tool is called with a valid `symbol` parameter (e.g., "AAPL")
- **THEN** the server makes an authenticated GET request to `https://www.valueray.com/api/v1/symbolData?symbol=AAPL`
- **THEN** the server returns the resulting JSON payload to the agent.

#### Scenario: Valueray API returns an error or rate limit
- **WHEN** the Valueray API responds with an error status (e.g., 429 Too Many Requests)
- **THEN** the server returns a formatted error message to the agent explaining the rate limit or failure.
