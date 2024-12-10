package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.UserController;
import org.enterprise.odontosoft.view.dto.CredencialDto;
import org.enterprise.odontosoft.view.dto.PermisosDto;
import org.enterprise.odontosoft.view.dto.UsuarioDto;
import org.enterprise.odontosoft.view.dto.UsuarioValidarDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserView {

  private final UserController userController;

  public UserView(UserController userController) {
    this.userController = userController;
  }

  @PostMapping("user/login")
  public ResponseEntity<CredencialDto> login(@Valid @RequestBody CredencialDto credencial) {
    return userController.login(credencial);
  }

  @PostMapping("user/signup")
  public ResponseEntity<String> signup(@Valid @RequestBody UsuarioDto usuarioDto) {
    return userController.signup(usuarioDto);
  }

  @GetMapping("user/validatetoken")
  public ResponseEntity<Void> validateToken(@Valid @RequestBody UsuarioValidarDto usuarioValidarDto) {
    return userController.validateToken(usuarioValidarDto);
  }

  @GetMapping("user/prueba")
  public String prueba() {
    return "prueba";
  }

  @PostMapping("user/validateRole")
  public ResponseEntity<PermisosDto> validateRole(@Valid @RequestBody UsuarioDto usuarioDto) {
    return userController.validateRole(usuarioDto);
  }
}
