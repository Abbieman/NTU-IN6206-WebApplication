package com.bustopup.server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bustopup.server.entity.Transaction;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TransactionMapper extends BaseMapper<Transaction> {}
