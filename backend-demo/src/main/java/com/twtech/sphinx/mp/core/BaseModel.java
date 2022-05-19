package com.twtech.sphinx.mp.core;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;

public class BaseModel implements Serializable {
	private static final long serialVersionUID = 3838547704500602158L;

    @Id
    //@KeySql(useGeneratedKeys = true)
	protected String id;

	/**
	 * 数据有效性 1有效 0无效
	 */
	protected Integer status = 1;
	protected Integer revision = 0;

	protected String createdBy;
	protected Date createdTime;
	protected String updatedBy;
	protected Date updatedTime;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getRevision() {
		return revision;
	}
	public void setRevision(Integer revision) {
		this.revision = revision;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Date getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}

}
