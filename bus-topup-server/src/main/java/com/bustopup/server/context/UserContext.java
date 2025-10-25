package com.bustopup.server.context;

public class UserContext {

    // For every request, set a userId
    private static final ThreadLocal<String> USER_ID_HOLDER = new ThreadLocal<>();

    /** Set ID */
    public static void setUserId(String userId) {
        USER_ID_HOLDER.set(userId);
    }

    /** Get ID */
    public static String getUserId() {
        return USER_ID_HOLDER.get();
    }

    /** Clear ThreadLocal */
    public static void clear() {
        USER_ID_HOLDER.remove();
    }
}
