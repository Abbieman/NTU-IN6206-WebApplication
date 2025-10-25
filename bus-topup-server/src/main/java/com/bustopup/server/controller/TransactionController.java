package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.dto.AddTransactionDTO;
import com.bustopup.server.entity.Transaction;
import com.bustopup.server.enums.TransactionType;
import com.bustopup.server.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@Tag(name = "Transaction")
public class TransactionController {

    TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/addTransaction")
    @Operation(summary = "add new transaction")
    public Result<Object> addTransaction(@Valid @RequestBody AddTransactionDTO addTransactionDTO) {
        if(addTransactionDTO.getType() == TransactionType.TOP_UP) {
            transactionService.processTopUp(addTransactionDTO.getCardNumber(), addTransactionDTO.getAmount());
        } else if (addTransactionDTO.getType() == TransactionType.PAYMENT) {
            transactionService.processPayment(addTransactionDTO.getCardNumber(), addTransactionDTO.getAmount());
        } else {
            transactionService.processRefund(addTransactionDTO.getCardNumber(), addTransactionDTO.getAmount());
        }
        return Result.success(Message.TRANSACTION_ADDED);
    }

    @GetMapping("/getTransactionList")
    @Operation(summary = "get all transaction")
    public Result<List<Transaction>> getTransactionList() {
        List<Transaction> transactionList = transactionService.getTransactionList();
        System.out.println(transactionList);
        return Result.success(transactionList, Message.GET_TRANSACTION_SUCCESS);
    }
}
