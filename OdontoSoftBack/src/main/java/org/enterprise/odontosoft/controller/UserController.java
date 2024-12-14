package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;

public interface UserController {
  ResponseEntity<CredencialDto> login(CredencialDto credencial);

  ResponseEntity<String> recordarContrasenia(UsuarioRecordarDto usuarioRecordarDto);

  ResponseEntity<String> signup(UsuarioDto usuarioDto);

  ResponseEntity<PermisosDto> validateRole(UsuarioDto usuarioDto);

  ResponseEntity<Void> validateToken(UsuarioValidarDto usuarioValidarDto);

    ResponseEntity<String> resetPassword(UsuarioPasswordDto usuarioPasswordDto);
}
