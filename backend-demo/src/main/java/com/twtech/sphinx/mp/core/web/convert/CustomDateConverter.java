package com.twtech.sphinx.mp.core.web.convert;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * 自定义日期参数转换器
 */
@Component
public class CustomDateConverter implements Converter<String, Date> {

	private static final List<String[]> formats = new ArrayList<>(4);
	
	static {
		formats.add(new String[] {"^\\d{4}$", "yyyy"});
		formats.add(new String[] {"^\\d{4}-\\d{1,2}$", "yyyy-MM"});
		formats.add(new String[] {"^\\d{4}-\\d{1,2}-\\d{1,2}$", "yyyy-MM-dd"});
		formats.add(new String[] {"^\\d{4}-\\d{1,2}-\\d{1,2} {1}\\d{1,2}:\\d{1,2}$", "yyyy-MM-dd HH:mm"});
		formats.add(new String[] {"^\\d{4}-\\d{1,2}-\\d{1,2} {1}\\d{1,2}:\\d{1,2}:\\d{1,2}$", "yyyy-MM-dd HH:mm:ss"});
	}

	@Override
	public Date convert(String source) {
		if (StringUtils.isBlank(source)) {
			return null;
		}
		
		source = source.trim();
		
		for(String[] format : formats) {
			if (source.matches(format[0])) {
				return parseDate(source, format[1]);
			}
		}
		
		throw new IllegalArgumentException("Invalid input value '" + source + "'");
	}

	/**
	 * 格式化日期
	 * 
	 * @param dateStr String 字符型日期
	 * @param format  String 格式
	 * @return Date 日期
	 */
	private Date parseDate(String dateStr, String format) {
		Date date = null;
		try {
			DateFormat dateFormat = new SimpleDateFormat(format);
			date = dateFormat.parse(dateStr);
		} catch (Exception e) {

		}
		return date;
	}

}
