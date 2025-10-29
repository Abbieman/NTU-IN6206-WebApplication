package com.bustopup.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bustopup.server.common.exception.BizException;
import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.context.UserContext;
import com.bustopup.server.dto.AddCardDTO;
import com.bustopup.server.entity.Card;
import com.bustopup.server.entity.UserCardBinding;
import com.bustopup.server.enums.CardType;
import com.bustopup.server.enums.UserRole;
import com.bustopup.server.mapper.CardMapper;
import com.bustopup.server.mapper.UserCardBindingMapper;
import com.bustopup.server.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CardServiceImpl implements CardService {
    private final CardMapper cardMapper;
    private final UserCardBindingMapper userCardBindingMapper;

    @Autowired
    public CardServiceImpl(CardMapper cardMapper, UserCardBindingMapper userCardBindingMapper) {
        this.cardMapper = cardMapper;
        this.userCardBindingMapper = userCardBindingMapper;
    }

    @Override
    public void addCard(AddCardDTO addCardDTO) {
        if(UserContext.getUserRole() != UserRole.ADMIN) {
            throw new BizException(StatusCode.FORBIDDEN, Message.USER_FORBIDDEN);
        }
        String card_number = addCardDTO.getCardNumber();
        QueryWrapper<Card> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("card_number", card_number);
        Card card = cardMapper.selectOne(queryWrapper);
        if (card != null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.CARD_EXISTS);
        }
        // Get now and expireTime
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expireTime = now.plusYears(5);
        Card newCard = Card.builder()
                .id(UUID.randomUUID().toString())
                .cardNumber(addCardDTO.getCardNumber())
                .type(addCardDTO.getType())
                .balance(addCardDTO.getBalance())
                .createdAt(now)
                .expiredAt(expireTime)
                .build();
        cardMapper.insert(newCard);
    }

    @Override
    public void bindCard(String cardNumber, CardType cardType) {
        String userId = UserContext.getUserId();
        QueryWrapper<Card> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("card_number", cardNumber).eq("type", cardType);
        Card card = cardMapper.selectOne(queryWrapper);
        if (card == null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.CARD_NOT_EXISTS);
        }
        // check if the card is binding with the user
        QueryWrapper<UserCardBinding> bindingQuery = new QueryWrapper<>();
        bindingQuery.eq("user_id", userId).eq("card_id", card.getId());
        UserCardBinding existing = userCardBindingMapper.selectOne(bindingQuery);
        if (existing != null) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.CARD_ALREADY_BIND);
        }
        UserCardBinding binding = UserCardBinding.builder()
                .userId(userId)
                .cardId(card.getId())
                .build();
        userCardBindingMapper.insert(binding);
    }

    @Override
    public List<Card> getCardList() {
        String userId = UserContext.getUserId();
        QueryWrapper<UserCardBinding> bindingWrapper = new QueryWrapper<>();
        bindingWrapper.eq("user_id", userId);
        List<UserCardBinding> bindings = userCardBindingMapper.selectList(bindingWrapper);
        if (bindings.isEmpty()) {
            return List.of();
        }
        List<String> cardIds = bindings.stream()
                .map(UserCardBinding::getCardId)
                .toList();
        QueryWrapper<Card> cardQuery = new QueryWrapper<>();
        cardQuery.in("id", cardIds);
        return cardMapper.selectList(cardQuery);
    }
}
