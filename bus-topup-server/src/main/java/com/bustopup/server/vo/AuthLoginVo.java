package com.bustopup.server.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthLoginVo {
    // username
    private String username;
    // token
    private String token;
}
