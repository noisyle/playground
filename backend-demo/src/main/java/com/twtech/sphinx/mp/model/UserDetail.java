package com.twtech.sphinx.mp.model;

import javax.persistence.Table;

import com.twtech.sphinx.mp.core.BaseModel;

import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

/**
 * 用户个人信息表
 */
@Table(name = "sph_user_wx_detail")
@NameStyle(Style.camelhumpAndLowercase)
public class UserDetail extends BaseModel {
	private static final long serialVersionUID = -5609592153270984153L;

	private String city;
	private String age;
	private String job;
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	
	@Override
	public String toString() {
		return "UserDetail [city=" + city + ", age=" + age + ", job=" + job + "]";
	}
}