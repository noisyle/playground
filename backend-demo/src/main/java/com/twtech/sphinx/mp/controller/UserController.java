package com.twtech.sphinx.mp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twtech.sphinx.mp.model.User;
import com.twtech.sphinx.mp.security.CustomUserDetails;
import com.twtech.sphinx.mp.service.UserService;

/**
 * 用户信息相关接口
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserService userService;

	/**
	 * 用户个人信息查询接口
	 */
	@PostMapping("/me")
	public ResponseEntity<User> me(@AuthenticationPrincipal CustomUserDetails userDetails) {
		logger.debug("查询用户信息, openid: {}", userDetails.getOpenid());
		
		User user = userService.findByOpenid(userDetails.getOpenid());

		return ResponseEntity.ok(user);
	}

}
