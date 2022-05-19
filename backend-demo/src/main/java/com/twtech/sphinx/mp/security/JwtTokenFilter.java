package com.twtech.sphinx.mp.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtTokenFilter extends GenericFilterBean {
//    private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
			throws IOException, ServletException {
		String token = jwtTokenProvider.resolveToken((HttpServletRequest) req);
		if (token != null && jwtTokenProvider.validateToken(token)) {
//            logger.debug("payload: {}", (String) jwtTokenProvider.getClaim(token, "some-other-payload"));
			try {
				Authentication auth = token != null ? jwtTokenProvider.getAuthentication(token) : null;
				SecurityContextHolder.getContext().setAuthentication(auth);
			} catch (BadCredentialsException e) {
				((HttpServletResponse) res).setStatus(HttpStatus.UNAUTHORIZED.value());
			}
		}
		filterChain.doFilter(req, res);
	}
}
