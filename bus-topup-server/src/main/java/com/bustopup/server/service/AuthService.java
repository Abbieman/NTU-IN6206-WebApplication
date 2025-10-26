package com.bustopup.server.service;

import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;
import com.bustopup.server.vo.UserInfoVo;

public interface AuthService {
    // register
    void register(RegisterDTO registerDTO);
    // login
    String login(LoginDTO loginDTO);
    // logout
    void logout(String token);
    // get user info
    UserInfoVo getUserInfo();
}
