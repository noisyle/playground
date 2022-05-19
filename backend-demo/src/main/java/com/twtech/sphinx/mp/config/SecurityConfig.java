package com.twtech.sphinx.mp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.twtech.sphinx.mp.security.JwtTokenFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .httpBasic().disable()
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .headers()
        .frameOptions().sameOrigin()
        .and()
        .authorizeRequests()
            .antMatchers("/auth/login").permitAll()
  		  	.antMatchers("/h2-console/**").permitAll()
		  	
            .anyRequest().authenticated()
        .and()
        .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
		  .antMatchers("/webjars/**");
	}
    
    @Bean
    public JwtTokenFilter jwtTokenFilter() {
        JwtTokenFilter filter = new JwtTokenFilter();
        return filter;
    }
    
}
