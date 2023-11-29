package com.domdom.taskbe.controllers;

import com.domdom.taskbe.dtos.ResponseObject;
import com.domdom.taskbe.dtos.auth.AuthDto;
import com.domdom.taskbe.dtos.auth.AuthResponse;
import com.domdom.taskbe.dtos.auth.UserInfoDto;
import com.domdom.taskbe.dtos.auth.VerifyTokenRequest;
import com.domdom.taskbe.services.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("login")
    public ResponseEntity<ResponseObject> login(
            @RequestBody @Valid AuthDto authDto
            ) {

        AuthResponse authResponse = authService.authenticate(authDto);

        return ResponseEntity.ok(ResponseObject.builder()
                                .data(authResponse)
                                .message("login successfully")
                                .responseCode(HttpStatus.OK.value())
                                .build());
    }

    @PostMapping("register")
    public ResponseEntity<ResponseObject> register(
            @RequestBody @Valid AuthDto authDto
    ) {
        AuthResponse authResponse = authService.register(authDto);

        return ResponseEntity.ok(ResponseObject.builder()
                        .data(authResponse)
                        .message("register successfully")
                        .responseCode(HttpStatus.OK.value())
                        .build());
    }

    @PostMapping("verify-token")
    public ResponseEntity<ResponseObject> verifyToken(
            @RequestBody @Valid VerifyTokenRequest request
    ) {
        UserInfoDto userInfoDto = authService.verifyToken(request);
        return ResponseEntity.ok(ResponseObject.builder()
                                    .responseCode(200)
                                    .data(userInfoDto)
                                    .message("token is valid")
                                    .build());
    }
}
