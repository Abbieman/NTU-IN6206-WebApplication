package com.bustopup.server.service;

import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;

public interface AuthService {
    // register
    void register(RegisterDTO registerDTO);
    // login
    String login(LoginDTO loginDTO);
    // logout
    void logout(String token);
}
