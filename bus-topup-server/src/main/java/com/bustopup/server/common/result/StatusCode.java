package com.bustopup.server.common.result;

public class StatusCode {

    // Success Codes
    public static final int SUCCESS = 200;               // Request successful
    public static final int CREATED = 201;               // Resource successfully created
    public static final int ACCEPTED = 202;              // Request accepted but not yet processed
    public static final int NO_CONTENT = 204;            // Request successful, but no content returned

    // Client Error Codes (4xx)
    public static final int BAD_REQUEST = 400;           // Bad request — server could not understand it
    public static final int UNAUTHORIZED = 401;          // Unauthorized — authentication required
    public static final int FORBIDDEN = 403;             // Forbidden — access denied
    public static final int NOT_FOUND = 404;             // Resource not found
    public static final int METHOD_NOT_ALLOWED = 405;    // HTTP method not allowed
    public static final int REQUEST_TIMEOUT = 408;       // Request timed out
    public static final int CONFLICT = 409;              // Request conflict (e.g., duplicate data)

    // Server Error Codes (5xx)
    public static final int INTERNAL_SERVER_ERROR = 500; // Internal server error
    public static final int NOT_IMPLEMENTED = 501;       // Method not implemented
    public static final int SERVICE_UNAVAILABLE = 503;   // Service temporarily unavailable
    public static final int GATEWAY_TIMEOUT = 504;       // Gateway timeout
}
