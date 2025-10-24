package com.bustopup.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bustopup.server.common.exception.BizException;
import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;
import com.bustopup.server.entity.User;
import com.bustopup.server.enums.UserRole;
import com.bustopup.server.mapper.UserMapper;
import com.bustopup.server.service.AuthService;
import com.bustopup.server.utils.JwtUtil;
import com.bustopup.server.vo.AuthLoginVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserMapper userMapper;

    @Autowired
    public AuthServiceImpl(UserMapper userMapper) { this.userMapper = userMapper; }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void register(RegisterDTO registerDTO) {
        String username = registerDTO.getUsername();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        if (registerDTO.getPassword() != null) {
            Result.error(StatusCode.BAD_REQUEST, Message.USERNAME_EXISTS);
        }
        // use bcrypt hash and set it into database
        String hashedPassword = encoder.encode(registerDTO.getPassword());
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .username(username)
                .password(hashedPassword)
                .phone(registerDTO.getPhone())
                .email(registerDTO.getEmail())
                .role(UserRole.USER)
                .build();
        userMapper.insert(user);
    }

    public AuthLoginVo login(LoginDTO loginDTO) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", loginDTO.getUsername());
        User user = userMapper.selectOne(queryWrapper);
        if (user == null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.USERNAME_NOT_EXISTS);
        }
        if(!encoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.PASSWORD_NOT_CORRECT);
        }
        return AuthLoginVo.builder()
                .username(user.getUsername())
                .token(JwtUtil.generateToken(user.getId()))
                .build();
    }
}
