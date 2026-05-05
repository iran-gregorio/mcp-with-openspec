## REMOVED Requirements

### Requirement: Validate API Token on Startup
**Reason**: Authentication via `TOKEN_SERVICE` is no longer necessary for the current server deployment.
**Migration**: The `TOKEN_SERVICE` environment variable validation at startup and its usage in API requests will be completely removed. Users no longer need to configure this variable.
