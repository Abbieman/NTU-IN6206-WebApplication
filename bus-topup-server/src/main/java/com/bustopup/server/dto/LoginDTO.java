package com.bustopup.server.dto;

import com.bustopup.server.common.result.Message;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
    // username
    @NotBlank(message = Message.USERNAME_EMPTY)
    @Pattern(regexp = "^\\S+$", message = Message.USERNAME_CONTAIN_BLANK)
    private String username;

    // password
    @NotBlank(message = Message.PASSWORD_EMPTY)
    @Pattern(regexp = "^\\S+$", message = Message.PASSWORD_CONTAIN_BLANK)
    private String password;
}
