package com.twtech.sphinx.mp.controller;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.twtech.sphinx.mp.utils.UUIDGenerator;

/**
 * 上传相关接口
 */
@RestController
@RequestMapping(value = "/upload")
public class UploadController {
	private Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 上传视频接口
	 */
	@PostMapping("/video")
	public ResponseEntity<Object> me(MultipartFile file, Integer width, Integer height) {
		logger.debug("width: {}", width);
		logger.debug("height: {}", height);
		logger.debug("size: {} KB", file.getSize() / 1024);
		
		File target = new File(System.getProperty("java.io.tmpdir"), UUIDGenerator.randomUUID() + ".mp4");
		try {
			file.transferTo(target);
			logger.debug("file saved to {}", target.getAbsolutePath());
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.ok("video upload success");
	}

}
