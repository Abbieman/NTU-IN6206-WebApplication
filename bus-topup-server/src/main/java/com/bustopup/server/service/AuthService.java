package com.bustopup.server.service;

import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;
import com.bustopup.server.vo.AuthLoginVo;

public interface AuthService {
    // register
    void register(RegisterDTO registerDTO);
    // login
    AuthLoginVo login(LoginDTO loginDTO);
}
