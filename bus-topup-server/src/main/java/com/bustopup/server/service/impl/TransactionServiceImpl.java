package com.bustopup.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bustopup.server.common.exception.BizException;
import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.context.UserContext;
import com.bustopup.server.entity.Card;
import com.bustopup.server.entity.Transaction;
import com.bustopup.server.enums.TransactionType;
import com.bustopup.server.mapper.CardMapper;
import com.bustopup.server.mapper.TransactionMapper;
import com.bustopup.server.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final CardMapper cardMapper;
    private final TransactionMapper transactionMapper;

    @Autowired
    public TransactionServiceImpl(CardMapper cardMapper, TransactionMapper transactionMapper) {
        this.cardMapper = cardMapper;
        this.transactionMapper = transactionMapper;
    }

    private Card getCardByNum(String cardNum) {
        QueryWrapper<Card> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("card_number", cardNum);
        Card card = cardMapper.selectOne(queryWrapper);
        if (card == null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.CARD_NOT_EXISTS);
        }
        return card;
    }

    private void recordTransaction(String cardId, BigDecimal amount, TransactionType type) {
        Transaction tx = Transaction.builder()
                .id(UUID.randomUUID().toString())
                .userId(UserContext.getUserId())
                .cardId(cardId)
                .amount(amount)
                .type(type)
                .createdAt(LocalDateTime.now())
                .build();
        transactionMapper.insert(tx);
    }

    // Top UP
    @Override
    @Transactional
    public void processTopUp(String cardNumber, BigDecimal amount) {
        Card card = getCardByNum(cardNumber);
        card.setBalance(card.getBalance().add(amount));
        cardMapper.updateById(card);
        recordTransaction(card.getId(), amount, TransactionType.TOP_UP);
    }

    // payment
    @Override
    @Transactional
    public void processPayment(String cardNumber, BigDecimal amount) {
        Card card = getCardByNum(cardNumber);
        if (card.getBalance().compareTo(amount) < 0) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.INSUFFICIENT_BALANCE);
        }
        card.setBalance(card.getBalance().subtract(amount));
        cardMapper.updateById(card);
        recordTransaction(card.getId(), amount.negate(), TransactionType.PAYMENT);
    }

    // refund
    @Override
    @Transactional
    public void processRefund(String cardNumber, BigDecimal amount) {
        Card card = getCardByNum(cardNumber);
        card.setBalance(card.getBalance().add(amount));
        cardMapper.updateById(card);
        recordTransaction(card.getId(), amount, TransactionType.REFUND);
    }

    @Override
    public List<Transaction> getTransactionList() {
        String userId = UserContext.getUserId();
        QueryWrapper<Transaction> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return transactionMapper.selectList(queryWrapper);
    }
}
