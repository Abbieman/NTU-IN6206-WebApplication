package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;
import com.bustopup.server.service.AuthService;
import com.bustopup.server.vo.LoginVo;
import com.bustopup.server.vo.UserInfoVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name="Authorization")
public class AuthController {
    AuthService authService;

    @Autowired
    public AuthController(AuthService authService) { this.authService = authService; }

    // Authorization register
    @PostMapping("/register")
    @Operation(summary = "register")
    public Result<Object> register(@Valid @RequestBody RegisterDTO registerDTO) {
        authService.register(registerDTO);
        return Result.success(Message.REGISTER_SUCCESS);
    }

    // Authorization login
    @PostMapping("/login")
    @Operation(summary = "login")
    public Result<LoginVo> login(@Valid @RequestBody LoginDTO loginDTO) {
        LoginVo loginVo = authService.login(loginDTO);
        return Result.success(loginVo, Message.LOGIN_SUCCESS);
    }

    // Authorization logout
    @PostMapping("/logout")
    @Operation(summary = "logout")
    public Result<Object> logout(HttpServletRequest request) {
        // get token from Authorization
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return Result.error(StatusCode.UNAUTHORIZED, Message.INVALID_TOKEN);
        }
        String token = header.substring(7);
        authService.logout(token);
        return Result.success(Message.LOGOUT_SUCCESS);
    }

    // Get User Info
    @GetMapping("/getUserInfo")
    @Operation(summary = "get user information")
    public Result<Object> getUserInfo() {
        UserInfoVo userInfoVo = authService.getUserInfo();
        return Result.success(userInfoVo, Message.SUCCESS);
    }
}
