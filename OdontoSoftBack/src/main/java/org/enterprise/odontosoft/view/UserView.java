package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.UserController;
import org.enterprise.odontosoft.view.dto.*;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class UserView {

    private final UserController userController;

    public UserView(UserController userController) {
        this.userController = userController;
    }

    @PostMapping("user/login")
    public ResponseEntity<ApiResponse<CredencialDto>> login(@Valid @RequestBody CredencialDto credencial) {
        CredencialDto response = userController.login(credencial).getBody();
        return ResponseEntity.ok(ApiResponse.success(response, "Login exitoso"));
    }

    @PutMapping("user/recordarContrasenia")
    public ResponseEntity<ApiResponse<String>> recordarContrasenia(@Valid @RequestBody UsuarioRecordarDto usuarioRecordarDto) {
        String response = userController.recordarContrasenia(usuarioRecordarDto).getBody();
        return ResponseEntity.ok(ApiResponse.success(response, "Correo de recuperación enviado"));
    }

    @PostMapping("user/signup")
    public ResponseEntity<ApiResponse<String>> signup(@Valid @RequestBody UsuarioDto usuarioDto) {
        String response = userController.signup(usuarioDto).getBody();
        return ResponseEntity.ok(ApiResponse.success(response, "Usuario registrado correctamente"));
    }

    @GetMapping("user/validatetoken")
    public ResponseEntity<ApiResponse<Void>> validateToken(@Valid @RequestBody UsuarioValidarDto usuarioValidarDto) {
        userController.validateToken(usuarioValidarDto);
        return ResponseEntity.ok(ApiResponse.success(null, "Token válido"));
    }

    @GetMapping("user/prueba")
    public ResponseEntity<ApiResponse<String>> prueba() {
        return ResponseEntity.ok(ApiResponse.success("prueba", "Prueba exitosa"));
    }

    @PostMapping("user/validateRole")
    public ResponseEntity<ApiResponse<PermisosDto>> validateRole(@Valid @RequestBody UsuarioDto usuarioDto) {
        PermisosDto response = userController.validateRole(usuarioDto).getBody();
        return ResponseEntity.ok(ApiResponse.success(response, "Rol validado correctamente"));
    }

    @PutMapping("user/resetpassword")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody UsuarioPasswordDto usuarioPasswordDto) {
        String response = userController.resetPassword(usuarioPasswordDto).getBody();
        return ResponseEntity.ok(ApiResponse.success(response, "Contraseña restablecida correctamente"));
    }
}