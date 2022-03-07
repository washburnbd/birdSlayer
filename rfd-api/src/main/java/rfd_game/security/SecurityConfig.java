package rfd_game.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtConverter jwtConverter;
    private final String[] origins;

    public SecurityConfig(JwtConverter jwtConverter, @Value("${rfd.allowed_origins}") String allowedOrigins){
        this.jwtConverter = jwtConverter;
        if(allowedOrigins == null || allowedOrigins.isBlank()){
            origins = new String[0];
        } else {
            origins = allowedOrigins.split("\\s*,\\s*");
        }
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers(HttpMethod.POST,"/rfd/create_game_user","/rfd/authenticate","/rfd/expire_token").permitAll()
                .antMatchers(HttpMethod.GET, "/rfd/get_game_user/**").permitAll()
                .antMatchers(HttpMethod.POST,"/rfd/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET,"/rfd/**").authenticated()
                .antMatchers(HttpMethod.POST, "/rfd/**").authenticated()
                .antMatchers(HttpMethod.PUT,"/rfd/**").authenticated()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(),jwtConverter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        // Configure CORS globally versus
        // controller-by-controller or method-by-method.
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {


                registry.addMapping("/rfd/**")
                        .allowedMethods("DELETE", "GET", "POST", "PUT")
                        .allowedOrigins(origins)
                        .allowCredentials(true);
            }
        };
    }

}

