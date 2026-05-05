### Requirement: Retrieve Symbol Peers
The server MUST expose a `symbol-peers` tool that fetches ranking and financial metrics for peer symbols by calling the Valueray `/symbolPeers` endpoint.

#### Scenario: Agent requests peers for a valid symbol
- **WHEN** the `symbol-peers` tool is called with a valid `symbol` parameter
- **THEN** the server makes an authenticated GET request to `https://www.valueray.com/api/v1/symbolPeers?symbol=<symbol>`
- **THEN** the server returns the JSON payload containing the peer data to the agent.

#### Scenario: Agent requests peers with optional parameters
- **WHEN** the `symbol-peers` tool is called with optional parameters like `exchange`
- **THEN** the server includes these parameters in the request to the Valueray API.
