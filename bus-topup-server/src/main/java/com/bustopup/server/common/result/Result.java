package com.bustopup.server.common.result;

import lombok.Data;

import java.io.Serializable;

@Data
public class Result<T> implements Serializable {
    private Integer code;
    private String msg;
    private T data;

    public static <T> Result<T> success(String msg) {
        Result<T> result = new Result<T>();
        result.msg = msg;
        result.code = StatusCode.SUCCESS;
        return result;
    }

    public static <T> Result<T> success(T object, String msg) {
        Result<T> result = new Result<T>();
        result.msg = msg;
        result.data = object;
        result.code = StatusCode.SUCCESS;
        return result;
    }

    public static <T> Result<T> error(Integer code, String msg) {
        Result result = new Result();
        result.msg = msg;
        result.code = code;
        return result;
    }
}