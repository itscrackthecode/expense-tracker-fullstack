
package com.example.expensetracker.controller;

import com.example.expensetracker.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // allow frontend
public class UserController {

    private List<User> users = new ArrayList<>();

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        users.add(user);
        return "User registered successfully!";
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return users;
    }
}
