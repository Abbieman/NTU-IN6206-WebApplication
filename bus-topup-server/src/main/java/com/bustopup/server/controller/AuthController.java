package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;
import com.bustopup.server.service.AuthService;
import com.bustopup.server.vo.AuthLoginVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name="Authorization")
public class AuthController {
    AuthService authService;

    @Autowired
    public AuthController(AuthService authService) { this.authService = authService; }

    // Authorization register
    @PostMapping("/register")
    @Operation(summary = "register", description = "register")
    public Result<Object> register(@Valid @RequestBody RegisterDTO registerDTO) {
        authService.register(registerDTO);
        return Result.success(Message.REGISTER_SUCCESS);
    }

    // Authorization login
    @PostMapping("/login")
    @Operation(summary = "login" , description = "login")
    public Result<Object> login(@Valid @RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        AuthLoginVo authLoginVo = authService.login(loginDTO);
        // set HttpOnly Cookie，prevent JS get Cookie
        Cookie cookie = new Cookie("token", authLoginVo.getToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400); // 1 day
        response.addCookie(cookie);
        return Result.success(authLoginVo, Message.LOGIN_SUCCESS)
    }
}
