package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.*;

public interface UserController {
  CredencialDto login(CredencialDto credencial);

  String recordarContrasenia(UsuarioRecordarDto usuarioRecordarDto);

  String signup(UsuarioDto usuarioDto);

  PermisosDto validateRole(UsuarioDto usuarioDto);

  void validateToken(UsuarioValidarDto usuarioValidarDto);

  String resetPassword(UsuarioPasswordDto usuarioPasswordDto);
}
