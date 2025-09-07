package com.example.expensetracker.service;

import com.example.expensetracker.model.Transaction;
import com.example.expensetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repo;

    public Transaction addTransaction(Transaction t){
        return repo.save(t);
    }

    public List<Transaction> getTransactionsByUser(Long userId){
        return repo.findByUserId(userId);
    }

    public void deleteTransaction(Long id){
        repo.deleteById(id);
    }
}
