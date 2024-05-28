package org.enterprise.odontosoft.controller;

import jakarta.validation.Valid;
import org.enterprise.odontosoft.model.Dao.MenuDao;
import org.enterprise.odontosoft.model.Dao.UsuarioDao;
import org.enterprise.odontosoft.model.Entity.Menu;
import org.enterprise.odontosoft.model.Entity.Rol;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.CredencialDto;
import org.enterprise.odontosoft.view.dto.MenuDto;
import org.enterprise.odontosoft.view.dto.PermisosDto;
import org.enterprise.odontosoft.view.dto.UsuarioDto;
import org.enterprise.odontosoft.view.security.UtilSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Controller
public class UsuarioControllerImpl implements UsuarioController {

  private final UsuarioDao usuarioDao;
  private final MenuDao menuDao;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  public UsuarioControllerImpl(UsuarioDao usuarioDao, MenuDao menuDao, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
    this.usuarioDao = usuarioDao;
    this.menuDao = menuDao;
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public CredencialDto login(@Valid @RequestBody CredencialDto credencial) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credencial.getUsuario(), credencial.getClave()));
    String token = UtilSecurity.generateToken(credencial.getUsuario());
    return CredencialDto.builder().usuario(credencial.getUsuario()).token(token).build();
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
        .clave(passwordEncoder.encode(usuarioDto.getClave()))
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
    MenuDto menuDto = new MenuDto();

    List<Menu> menus = menuDao.findByCodigoUsuario(usuarioDto.getCodigo());
    if (menus.isEmpty()) {
      menus.stream().forEach(menu -> {
//        menuDto = MenuDto.builder()
//          .nombreMenu(menu.getDescripcion())
//          .url(menu.getUrl())
//            .nombreMenuPadre(menuDao.findById(menu.getIdMenuPadre()).map(Menu::getDescripcion).orElse(null))
//          .build();
        permisosDto.getMenus().add(menuDto);
      });

      responseEntity = ResponseEntity.status(HttpStatus.OK).build();
      return responseEntity;
    }

    return null; //usuarioController.validateRole(permisosDto);
  }

}
