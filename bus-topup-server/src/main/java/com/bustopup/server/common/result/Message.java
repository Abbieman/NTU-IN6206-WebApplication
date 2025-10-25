package com.bustopup.server.common.result;

/**
 * Global constant messages used across the system.
 */
public class Message {

    // ====== Exception ======
    public static final String REQUEST_BODY_NOT_CORRECT = "Request body is not correct!";
    public static final String SERVER_INTERVAL_ERROR = "Interval server error!";

    // ====== Auth ======
    public static final String USER_FORBIDDEN = "You are not authorized to perform this action!";
    public static final String REGISTER_SUCCESS = "Registration successful!";
    public static final String USERNAME_EXISTS = "User already exists!";
    public static final String USERNAME_NOT_EXISTS = "User not exists!";
    public static final String USERNAME_EMPTY = "Username cannot be empty!";
    public static final String USERNAME_CONTAIN_BLANK = "Username can not contain blank!";
    public static final String PASSWORD_EMPTY = "Password cannot be empty!";
    public static final String PASSWORD_NOT_CORRECT = "Password is not correct!";
    public static final String PASSWORD_CONTAIN_BLANK = "Password can not contain blank!";
    public static final String EMAIL_EMPTY = "Email cannot be empty!";
    public static final String EMAIL_WRONG = "Please enter a valid email address!";
    public static final String PHONE_EMPTY = "Email cannot be empty!";
    public static final String PHONE_WRONG = "Please enter a valid phone number!";
    public static final String LOGIN_SUCCESS = "Login successful!";
    public static final String LOGOUT_SUCCESS = "Logout successful!";
    public static final String INVALID_TOKEN = "Invalid or expired token!";

    // ====== Card ======
    public static final String CARD_EXISTS = "Card already exists!";
    public static final String CARD_NOT_EXISTS = "Card not exists!";
    public static final String ADD_CARD_SUCCESS = "Add card successful!";
    public static final String BIND_CARD_SUCCESS = "Bind card successful!";
    public static final String CARD_ALREADY_BIND = "Card already binds with the user!";
    public static final String CARD_NUM_EMPTY = "Card number cannot be empty!";
    public static final String CARD_NUM_16_DIGITS = "Card number must be 16 digits!";
    public static final String CARD_TYPE_EMPTY = "Card type cannot be empty!";
    public static final String CARD_BALANCE_EMPTY = "Balance cannot be empty!";
    public static final String CARD_BALANCE_NOT_CORRECT = "Balance must be a valid number with up to 2 decimal places!";
    public static final String GET_CARD_SUCCESS = "Get card successful!";

    // ====== Transaction ======
    public static final String INSUFFICIENT_BALANCE = "You don't have enough money!";
    public static final String AMOUNT_NULL = "Amount cannot be null!";
    public static final String AMOUNT_MORE_THAN_0 = "Amount must be greater than 0";
    public static final String TYPE_NULL = "Type cannot be null!";
    public static final String TRANSACTION_ADDED = "Transaction added!";
    public static final String GET_TRANSACTION_SUCCESS = "Get transaction successful!";
}
