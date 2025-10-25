package com.bustopup.server.service;

import com.bustopup.server.entity.Transaction;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {
    // Top UP
    void processTopUp(String cardNumber, BigDecimal amount);
    // Payment
    void processPayment(String cardNumber, BigDecimal amount);
    // Refund
    void processRefund(String cardNumber, BigDecimal amount);
    // Get Transaction List
    List<Transaction> getTransactionList();
}
