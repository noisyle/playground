package com.twtech.sphinx.mp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.twtech.sphinx.mp.model.User;

@Mapper
public interface UserRepository extends tk.mybatis.mapper.common.Mapper<User> {
}
