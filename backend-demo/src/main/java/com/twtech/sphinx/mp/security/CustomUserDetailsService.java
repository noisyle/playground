package com.twtech.sphinx.mp.security;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.twtech.sphinx.mp.model.User;
import com.twtech.sphinx.mp.service.UserService;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws BadCredentialsException {
        User user = Optional.ofNullable(this.userService.findByOpenid(username))
                .orElseThrow(() -> new BadCredentialsException("openid: " + username + " not found"));
        
        CustomUserDetails userDetails = new CustomUserDetails();
        BeanUtils.copyProperties(user, userDetails);
        
        return userDetails;
    }
}
