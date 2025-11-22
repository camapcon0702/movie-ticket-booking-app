/**
 * Redux Action Types for Authentication
 * Following naming conventions and consistency
 */

// Authentication Actions
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

// User Actions
export const SET_USER_INFO = "SET_USER_INFO";
export const CLEAR_USER_INFO = "CLEAR_USER_INFO";

// Error Actions
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

// Loading Actions
export const SET_LOADING = "SET_LOADING";

// Legacy support (for backward compatibility)
export const SIGN_IN_SUCCESS = LOGIN_SUCCESS;
export const SET_USER_INIT = "SET_USER_INIT";
