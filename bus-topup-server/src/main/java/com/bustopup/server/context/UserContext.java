package com.bustopup.server.context;

import com.bustopup.server.enums.UserRole;

public class UserContext {

    // For each request, bind userId and role
    private static final ThreadLocal<String> USER_ID_HOLDER = new ThreadLocal<>();
    private static final ThreadLocal<UserRole> USER_ROLE_HOLDER = new ThreadLocal<>();

    /** Set User ID */
    public static void setUserId(String userId) {
        USER_ID_HOLDER.set(userId);
    }

    /** Get User ID */
    public static String getUserId() {
        return USER_ID_HOLDER.get();
    }

    /** Set User Role */
    public static void setUserRole(UserRole role) {
        USER_ROLE_HOLDER.set(role);
    }

    /** Get User Role */
    public static UserRole getUserRole() {
        return USER_ROLE_HOLDER.get();
    }

    /** Clear ThreadLocal */
    public static void clear() {
        USER_ID_HOLDER.remove();
        USER_ROLE_HOLDER.remove();
    }
}
