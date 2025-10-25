package com.bustopup.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bustopup.server.common.exception.BizException;
import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.dto.LoginDTO;
import com.bustopup.server.dto.RegisterDTO;
import com.bustopup.server.entity.User;
import com.bustopup.server.enums.UserRole;
import com.bustopup.server.mapper.UserMapper;
import com.bustopup.server.service.AuthService;
import com.bustopup.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserMapper userMapper;
    private final StringRedisTemplate redisTemplate;
    private static final long TOKEN_EXPIRE = 24 * 60 * 60; // 24h

    @Autowired
    public AuthServiceImpl(UserMapper userMapper, StringRedisTemplate redisTemplate) {
        this.userMapper = userMapper;
        this.redisTemplate = redisTemplate;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public void register(RegisterDTO registerDTO) {
        String username = registerDTO.getUsername();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        User user = userMapper.selectOne(queryWrapper);
        if (user != null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.USERNAME_EXISTS);
        }
        // use bcrypt hash and set it into database
        String hashedPassword = encoder.encode(registerDTO.getPassword());
        User newUser = User.builder()
                .id(UUID.randomUUID().toString())
                .username(username)
                .password(hashedPassword)
                .phone(registerDTO.getPhone())
                .email(registerDTO.getEmail())
                .role(UserRole.USER)
                .build();
        userMapper.insert(newUser);
    }

    @Override
    public String login(LoginDTO loginDTO) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", loginDTO.getUsername());
        User user = userMapper.selectOne(queryWrapper);
        if (user == null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.USERNAME_NOT_EXISTS);
        }
        if(!encoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.PASSWORD_NOT_CORRECT);
        }
        String token = JwtUtil.generateToken(user.getId(), user.getRole());
        redisTemplate.opsForValue().set("busTopup:token:" + token, user.getId(), TOKEN_EXPIRE, TimeUnit.SECONDS);
        return token;
    }

    @Override
    public void logout(String token) {
        redisTemplate.delete("busTopup:token:" + token);
    }
}
