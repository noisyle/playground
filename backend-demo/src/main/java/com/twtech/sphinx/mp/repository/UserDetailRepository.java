package com.twtech.sphinx.mp.repository;

import org.apache.ibatis.annotations.Mapper;

import com.twtech.sphinx.mp.model.UserDetail;

@Mapper
public interface UserDetailRepository extends tk.mybatis.mapper.common.Mapper<UserDetail> {
}
