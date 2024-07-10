package org.enterprise.odontosoft.controller;

import jakarta.validation.Valid;
import org.enterprise.odontosoft.model.Dao.MenuDao;
import org.enterprise.odontosoft.model.Dao.UsuarioDao;
import org.enterprise.odontosoft.model.Entity.Menu;
import org.enterprise.odontosoft.model.Entity.Rol;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.*;
import org.enterprise.odontosoft.view.security.UtilSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.nio.file.AccessDeniedException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Controller
public class UsuarioControllerImpl implements UsuarioController {

  private final UsuarioDao usuarioDao;
  private final MenuDao menuDao;
  private final AuthenticationManager authenticationManager;
  private MessageDigest passwordEncoder;

  public UsuarioControllerImpl(UsuarioDao usuarioDao, MenuDao menuDao, AuthenticationManager authenticationManager) {
    this.usuarioDao = usuarioDao;
    this.menuDao = menuDao;
    this.authenticationManager = authenticationManager;
  }

  @Override
  public ResponseEntity<CredencialDto> login(@Valid @RequestBody CredencialDto credencial) {
    ResponseEntity<CredencialDto> responseEntity;
    Usuario usuario = usuarioDao.findByCodigo(credencial.getUsuario());
    if (credencial.getClave().equals(usuario.getClave())) {
      String token = UtilSecurity.generateToken(credencial.getUsuario());
      responseEntity = ResponseEntity.status(HttpStatus.OK).body(CredencialDto.builder().usuario(credencial.getUsuario()).token(token).build());
      return responseEntity;
    } else {
      responseEntity = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      return responseEntity;
    }
  }

  @Override
  public ResponseEntity<Void> signup(UsuarioDto usuarioDto) {
    ResponseEntity<Void> responseEntity;
    Usuario usuario = usuarioDao.findByCodigo(usuarioDto.getCodigo());
    if (usuario == null) {
        Rol rol = new Rol();
        rol.setId(usuarioDto.getIdRol());
        usuario = Usuario.builder()
          .codigo(usuarioDto.getCodigo())
          .nombre(usuarioDto.getNombre())
          .clave(UtilSecurity.encriptar(usuarioDto.getClave()))
          .habilitado(Boolean.TRUE)
          .idRol(rol)
          .build();
        usuarioDao.save(usuario);
        responseEntity = ResponseEntity.status(HttpStatus.CREATED).build();
    } else {
      responseEntity = ResponseEntity.status(HttpStatus.CONFLICT).build();
      return responseEntity;
    }
    return responseEntity;
  }

  @Override
  public ResponseEntity<PermisosDto> validateRole(UsuarioDto usuarioDto) {
    ResponseEntity<PermisosDto> responseEntity;
    PermisosDto permisosDto = new PermisosDto();
    permisosDto.setMenus(new ArrayList<>());
    MenuDto menuDto = new MenuDto();

    List<Menu> menus = menuDao.findByCodigoUsuario(usuarioDto.getCodigo());
    if (!menus.isEmpty()) {
      menus.stream().forEach(menu -> {
        permisosDto.getMenus().add(MenuDto.builder()
          .nombreMenu(menu.getDescripcion())
          .url(menu.getUrl())
          .nombreMenuPadre(Objects.isNull(menu.getIdMenuPadre()) ? null : menuDao.findById(menu.getIdMenuPadre()).map(Menu::getDescripcion).orElse(null))
          .build());
      });

      responseEntity = ResponseEntity.status(HttpStatus.OK).body(permisosDto);
      return responseEntity;
    }

    return null; //usuarioController.validateRole(permisosDto);
  }

  @Override
  public ResponseEntity<Void> validateToken(UsuarioValidarDto usuarioValidarDto) {
    ResponseEntity<Void> responseEntity = null;
    try {
      boolean validado = UtilSecurity.validateToken(usuarioValidarDto.getToken(), usuarioValidarDto.getUsuario());

      if (validado) {
        responseEntity = ResponseEntity.status(HttpStatus.OK).build();
      } else {
        responseEntity = ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
      }
    } catch (AccessDeniedException e) {
      responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    return responseEntity;
  }

}
