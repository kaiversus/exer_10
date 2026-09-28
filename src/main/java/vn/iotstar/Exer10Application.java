package vn.iotstar;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.iotstar.entity.User;
import vn.iotstar.repository.UserRepository;

@SpringBootApplication
public class Exer10Application {

    public static void main(String[] args) {
        SpringApplication.run(Exer10Application.class, args);
    }

    @Bean
    CommandLineRunner initDemoUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("test@gmail.com").isEmpty()) {
                User user = new User();
                user.setEmail("test@gmail.com");
                user.setFullName("Test User");
                user.setPassword(passwordEncoder.encode("123456"));
                user.setImages("default.png");
                userRepository.save(user);
            }
        };
    }
}
