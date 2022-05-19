package com.twtech.sphinx.mp.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.twtech.sphinx.mp.model.User;
import com.twtech.sphinx.mp.model.UserDetail;
import com.twtech.sphinx.mp.repository.UserDetailRepository;
import com.twtech.sphinx.mp.repository.UserRepository;
import com.twtech.sphinx.mp.utils.UUIDGenerator;

import tk.mybatis.mapper.entity.Example;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserDetailRepository userDetailRepository;

	public User findById(String id) {
		return userRepository.selectByPrimaryKey(id);
	}

	public User findByOpenid(String openid) {
		Example example = new Example(User.class);
		example.createCriteria()
			.andEqualTo("openid", openid)
			.andEqualTo("status", 1);
		return userRepository.selectOneByExample(example);
	}

	public User insert(User user) {
		Date ts = new Date();
		user.setCreatedTime(ts);
		user.setUpdatedTime(ts);
		userRepository.insert(user);
		return user;
	}

	public User update(User user) {
		user.setUpdatedTime(new Date());
		userRepository.updateByPrimaryKey(user);
		return user;
	}
	
	/**
	 * 根据用户 id 查询用户个人信息
	 * @param userId
	 * @return
	 */
	public UserDetail findUserDetailById(String userId) {
		return userDetailRepository.selectByPrimaryKey(userId);
	}

	/**
	 * 新增用户个人信息
	 * @param userDetail 用户个人信息
	 */
	public UserDetail insertUserDetail(UserDetail userDetail) {
		Date ts = new Date();
		userDetail.setCreatedTime(ts);
		userDetail.setUpdatedTime(ts);
		userDetailRepository.insert(userDetail);
		return userDetail;
	}
	
	
	// ==== 业务方法 ====
	
	/**
	 * 查询用户信息 VO 接口，对于新用户，自动创建用户微信信息和个人信息记录
	 * @param openid 公众平台openid
	 * @return UserVo
	 */
	@Transactional
	public User registerOrLogin(String openid, String unionid, String sessionKey) {
		User user = this.findByOpenid(openid);
		if(user != null) {
			// 老用户
			user.setSessionKey(sessionKey);
			this.update(user);
			return this.findUserVoByOpenid(openid);
		} else {
			// 新用户
			String uuid = UUIDGenerator.randomUUID();
			
			// 创建用户微信信息
			user = new User();
			user.setId(uuid);
			user.setOpenid(openid);
			user.setUnionid(unionid);
			user.setSessionKey(sessionKey);
			this.insert(user);
			
			// 创建用户个人信息
			UserDetail userDetail = new UserDetail();
			userDetail.setId(uuid);
			this.insertUserDetail(userDetail);
			
			user.setUserDetail(userDetail);
			return user;
		}
		
	}
	
	/**
	 * 根据用户 openid 查询用户信息VO
	 * @param openid
	 * @return
	 */
	public User findUserVoByOpenid(String openid) {
		User user = this.findByOpenid(openid);
		UserDetail userDetail = this.findUserDetailById(user.getId());
		
		user.setUserDetail(userDetail);
		return user;
	}
}
