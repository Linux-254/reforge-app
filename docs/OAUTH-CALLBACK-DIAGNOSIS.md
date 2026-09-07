# OAuth callback diagnosis

The callback route performs the expected request checks before session creation: it requires `code` and `state`, validates the one-time OAuth nonce against the browser cookie, exchanges the code for a token, retrieves user information, upserts the application user, creates the session token, and sets the session cookie.

The observed failure in the runtime log occurs during `db.upsertUser`, before the session cookie is created. The underlying error is `Client network socket disconnected before secure TLS connection was established`. This indicates a database connection or environment/network failure at the time of the callback rather than a missing callback parameter, failed state check, or cookie-option exception.

The no-sign-in demo does not invoke this path. A real authenticated verification still requires the configured database connection and OAuth provider to be available; the repair item remains open until that environment can be exercised successfully.
