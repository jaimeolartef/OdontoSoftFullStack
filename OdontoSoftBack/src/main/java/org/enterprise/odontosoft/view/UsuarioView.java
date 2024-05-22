package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.UsuarioController;
import org.enterprise.odontosoft.view.dto.CredencialDto;
import org.enterprise.odontosoft.view.dto.UsuarioDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class UsuarioView {

  @Autowired
  private UsuarioController usuarioController;

  @PostMapping("user/login")
  public CredencialDto login(@Valid @RequestBody CredencialDto credencial) {
    return usuarioController.login(credencial);
  }

  @PostMapping("user/signup")
  public ResponseEntity<Void> signup(@Valid @RequestBody UsuarioDto usuarioDto) {
    return usuarioController.signup(usuarioDto);
  }

  @GetMapping("user/prueba")
  public String prueba() {
    return "prueba";
  }
}
