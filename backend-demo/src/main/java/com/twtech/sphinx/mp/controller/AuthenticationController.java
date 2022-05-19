package com.twtech.sphinx.mp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twtech.sphinx.mp.model.User;
import com.twtech.sphinx.mp.security.CustomUserDetails;
import com.twtech.sphinx.mp.security.JwtTokenProvider;
import com.twtech.sphinx.mp.service.UserService;
import com.twtech.sphinx.mp.utils.UUIDGenerator;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import me.chanjar.weixin.common.error.WxErrorException;

/**
 * 用户微信登录授权相关接口
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	private Logger logger = LoggerFactory.getLogger(getClass());
	
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    WxMaService wxService;
    @Autowired
    private UserService userService;
    
    /**
     * 登陆接口
     * 根据 code 获取用户 openid
     * 如果首次登录，自动创建用户记录
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(String code) {
        if (StringUtils.isBlank(code)) {
            return ResponseEntity.badRequest().body("参数不正确");
        }

        try {
        	WxMaJscode2SessionResult session = null;
        	if(code.equals("_TEST_USER_")) {
        		// 测试用户，构造测试用数据
        		session = new WxMaJscode2SessionResult();
        		session.setOpenid("_TEST_USER_" + UUIDGenerator.randomUUID());
        		logger.info("构造测试用户, openid: {}", session.getOpenid());
        	} else {
        		// 调用微信接口，根据 code 获取取用户 openid
        		session = wxService.getUserService().getSessionInfo(code);
        		logger.info("微信登录接口调用成功, openid: {}", session.getOpenid());
        	}
            
            String openid = session.getOpenid();
            String token = jwtTokenProvider.createToken(openid, new ArrayList<String>());
            
            Map<String, Object> model = new HashMap<>();
            
            // 根据 openid 尝试进行登录
            try {
				Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(openid, openid));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} catch (AuthenticationException e) {
				// 新用户
				logger.warn("登录时查询用户信息失败, openid: {} {}", openid, e.getMessage());
			} finally {
				User vo = userService.registerOrLogin(session.getOpenid(), session.getUnionid(), session.getSessionKey());
				model.put("user", vo);
	            model.put("token", token);
			}
            
            return ResponseEntity.ok(model);
        } catch (WxErrorException e) {
            logger.error("登录失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("登陆失败");
        }
    }
    
    /**
     * 授权微信用户信息接口
     */
    @PostMapping("/info")
    public ResponseEntity<Object> info(
    		@AuthenticationPrincipal CustomUserDetails userDetails,
    		String encryptedData,
    		String iv) {

    	try {
	        String openid = userDetails.getOpenid();
			String sessionKey = userDetails.getSessionKey();
			
			logger.info("用户授权昵称头像, openid: {}", openid);
	
			// 解密用户信息
			WxMaUserInfo userInfo = wxService.getUserService().getUserInfo(sessionKey, encryptedData, iv);
	
	        User user = userService.findUserVoByOpenid(openid);
			user.setOpenid(openid);
			user.setNickname(userInfo.getNickName());
			user.setGender(Integer.valueOf(userInfo.getGender()));
			user.setCountry(userInfo.getCountry());
			user.setProvince(userInfo.getProvince());
			user.setCity(userInfo.getCity());
			user.setLanguage(userInfo.getLanguage());
			user.setAvatarurl(userInfo.getAvatarUrl());
	        userService.update(user);
	
			return ResponseEntity.ok(user);
		} catch (Exception e) {
            logger.error("获取授权失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("获取授权失败");
		}
    }
    
    /**
     * 授权手机号信息接口
     * 更新已保存的用户手机号信
     */
    @PostMapping("/phone")
    public ResponseEntity<Object> phone(
    		@AuthenticationPrincipal CustomUserDetails userDetails,
    		String encryptedData,
    		String iv) {
    	
    	try {
        	String openid = userDetails.getOpenid();
        	String sessionKey = userDetails.getSessionKey();
            logger.info("用户授权手机号, openid: {}", openid);

            // 解密用户信息
            WxMaPhoneNumberInfo info = wxService.getUserService().getPhoneNoInfo(sessionKey, encryptedData, iv);
            
            User user = userService.findById(userDetails.getId());
            user.setTelephone(info.getPurePhoneNumber());
            userService.update(user);

            return ResponseEntity.ok(user);
			
		} catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("获取授权失败");
		}
    }
    
}
