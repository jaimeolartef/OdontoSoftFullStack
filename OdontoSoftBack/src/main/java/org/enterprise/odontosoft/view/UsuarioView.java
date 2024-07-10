package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.UsuarioController;
import org.enterprise.odontosoft.view.dto.CredencialDto;
import org.enterprise.odontosoft.view.dto.PermisosDto;
import org.enterprise.odontosoft.view.dto.UsuarioDto;
import org.enterprise.odontosoft.view.dto.UsuarioValidarDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UsuarioView {

  private final UsuarioController usuarioController;

  public UsuarioView(UsuarioController usuarioController) {
    this.usuarioController = usuarioController;
  }

  @PostMapping("user/login")
  public ResponseEntity<CredencialDto> login(@Valid @RequestBody CredencialDto credencial) {
    return usuarioController.login(credencial);
  }

  @PostMapping("user/signup")
  public ResponseEntity<Void> signup(@Valid @RequestBody UsuarioDto usuarioDto) {
    return usuarioController.signup(usuarioDto);
  }

  @GetMapping("user/validatetoken")
  public ResponseEntity<Void> validateToken(@Valid @RequestBody UsuarioValidarDto usuarioValidarDto) {
    return usuarioController.validateToken(usuarioValidarDto);
  }

  @GetMapping("user/prueba")
  public String prueba() {
    return "prueba";
  }

  @PostMapping("user/validateRole")
  public ResponseEntity<PermisosDto> validateRole(@Valid @RequestBody UsuarioDto usuarioDto) {
    return usuarioController.validateRole(usuarioDto);
  }
}
