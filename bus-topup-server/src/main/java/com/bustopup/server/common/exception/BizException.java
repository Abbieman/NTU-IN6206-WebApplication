package com.bustopup.server.common.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class BizException extends RuntimeException {
    private int code;

    public BizException(int code, String message) {
        super(message);
        this.code = code;
    }
}
