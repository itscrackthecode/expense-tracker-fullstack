package com.example.expensetracker.service;

import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public User register(User user){
        return userRepo.save(user);
    }

    public User findByUsername(String username){
        return userRepo.findByUsername(username).orElse(null);
    }
}
