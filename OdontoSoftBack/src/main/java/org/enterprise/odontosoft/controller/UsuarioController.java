package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.CredencialDto;
import org.enterprise.odontosoft.view.dto.PermisosDto;
import org.enterprise.odontosoft.view.dto.UsuarioDto;
import org.springframework.http.ResponseEntity;

public interface UsuarioController {
  CredencialDto login(CredencialDto credencial);

  ResponseEntity<Void> signup(UsuarioDto usuarioDto);

  ResponseEntity<PermisosDto> validateRole(UsuarioDto usuarioDto);
}
