package com.catijr.backend.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig {

    @Value("${app.storage.upload-dir:uploads/covers}")
    private String uploadDir;

    @Value("${app.storage.artist-upload-dir:uploads/artists}")
    private String artistUploadDir;

    @Value("${app.storage.album-upload-dir:uploads/albums}")
    private String albumUploadDir;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowedOriginPatterns("*"); // todo: mudar em prod
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                Path uploadsPath = Paths.get(uploadDir).toAbsolutePath().normalize();
                String location = "file:" + uploadsPath + "/";
                registry.addResourceHandler("/covers/**")
                        .addResourceLocations(location);

                Path artistUploadsPath = Paths.get(artistUploadDir).toAbsolutePath().normalize();
                String artistLocation = "file:" + artistUploadsPath + "/";
                registry.addResourceHandler("/artists/**")
                        .addResourceLocations(artistLocation);

                Path albumUploadsPath = Paths.get(albumUploadDir).toAbsolutePath().normalize();
                String albumLocation = "file:" + albumUploadsPath + "/";
                registry.addResourceHandler("/albums/**")
                        .addResourceLocations(albumLocation);
            }
        };
    }
}
