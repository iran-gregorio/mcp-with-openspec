## ADDED Requirements

### Requirement: Validate API Token on Startup
The server MUST check for the presence of the `TOKEN_SERVICE` environment variable during initialization. If it is missing or empty, the server MUST exit with an error.

#### Scenario: Server starts with valid token
- **WHEN** the server is initialized and `TOKEN_SERVICE` is set to a non-empty string
- **THEN** the server initializes successfully and registers its tools.

#### Scenario: Server starts without token
- **WHEN** the server is initialized and `TOKEN_SERVICE` is undefined or empty
- **THEN** the server throws an error and exits immediately.
