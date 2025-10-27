package com.bustopup.server.vo;

import com.bustopup.server.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginVo {
    private String id;
    private UserRole role;
    private String token;
}
