package org.enterprise.odontosoft.controller;

import jakarta.validation.Valid;
import org.enterprise.odontosoft.model.Dao.MenuDao;
import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.model.Dao.PermisoMenuDao;
import org.enterprise.odontosoft.model.Dao.UsuarioDao;
import org.enterprise.odontosoft.model.Entity.Menu;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.model.Entity.Rol;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.model.Service.EmailService;
import org.enterprise.odontosoft.view.dto.*;
import org.enterprise.odontosoft.view.security.UtilSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import java.security.SecureRandom;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Controller
public class UserControllerImpl implements UserController {

  private static final String MENSAJE_USUARIO = "Usuario creado con éxito";
  private final EmailService emailService;

  private final UsuarioDao usuarioDao;
  private final MenuDao menuDao;
  private final PermisoMenuDao permisoMenuDao;
  private MenuDto menuPadreDto;
  private final PatientDao patientDao;

  public UserControllerImpl(UsuarioDao usuarioDao, MenuDao menuDao, EmailService emailService, PermisoMenuDao permisoMenuDao, PatientDao patientDao) {
    this.usuarioDao = usuarioDao;
    this.menuDao = menuDao;
	  this.emailService = emailService;
	  this.permisoMenuDao = permisoMenuDao;
	  this.patientDao = patientDao;
  }

  @Override
  public ResponseEntity<CredencialDto> login(@Valid @RequestBody CredencialDto credencial) {
    ResponseEntity<CredencialDto> responseEntity;
    Usuario usuario = usuarioDao.findByCodigo(credencial.getUsuario());
    if (Objects.nonNull(usuario) && credencial.getClave().equals(usuario.getClave())) {
      String token = UtilSecurity.generateToken(credencial.getUsuario());
      responseEntity = ResponseEntity.status(HttpStatus.OK).body(CredencialDto.builder().usuario(credencial.getUsuario()).token(token).build());
      return responseEntity;
    } else {
      responseEntity = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      return responseEntity;
    }
  }

  @Override
  public ResponseEntity<String> recordarContrasenia(UsuarioRecordarDto usuarioRecordarDto) {
    ResponseEntity<String> responseEntity;
    Usuario usuario = usuarioDao.findByEmail(usuarioRecordarDto.getEmail());

    if (usuario != null) {
      String newPassword = generateRandomString(8);
      String subject = "Recuperación de contraseña";
      String text = "Hola " + usuario.getNombre() + ",\n\nTu contraseña es " + newPassword + ".\n\nSaludos,\nEquipo de Soporte.";
      usuario.setClave(UtilSecurity.encriptar(newPassword));
      emailService.sendUserCreationEmail(usuario.getCorreo(), subject, text);
      responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(MENSAJE_USUARIO);
      usuarioDao.save(usuario);
    } else {
      responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no existe con el correo " + usuarioRecordarDto.getEmail());
    }
    return responseEntity;
  }

  public String generateRandomString(int length) {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    SecureRandom random = new SecureRandom();
    StringBuilder sb = new StringBuilder(length);
    for (int i = 0; i < length; i++) {
      sb.append(characters.charAt(random.nextInt(characters.length())));
    }
    return sb.toString();
  }


  @Override
  public ResponseEntity<String> signup(UsuarioDto usuarioDto) {
    ResponseEntity<String> responseEntity;
    Usuario usuario = usuarioDao.findByCodigo(usuarioDto.getCodigo());
    if (usuario == null) {
      Rol rol = new Rol();
      rol.setId(usuarioDto.getIdRol());
      usuario = Usuario.builder()
          .codigo(usuarioDto.getCodigo())
          .nombre(usuarioDto.getNombre())
          .clave(UtilSecurity.encriptar(usuarioDto.getClave()))
          .habilitado(Boolean.TRUE)
          .correo(usuarioDto.getCorreo())
          .idRol(rol)
          .build();
      usuarioDao.save(usuario);

      // Enviar correo electrónico
      String text = "Hola " + usuarioDto.getNombre() + ",\n\nTu usuario ha sido creado exitosamente.\nEl usuario es tu número de documento y la clave es " + usuarioDto.getClave() + ".\n\nSaludos,\nEquipo de Soporte.";
      emailService.sendUserCreationEmail(usuarioDto.getCorreo(), MENSAJE_USUARIO, text);

      responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(MENSAJE_USUARIO);
    } else {
      responseEntity = ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe con el codigo " + usuarioDto.getCodigo());
    }
    return responseEntity;
  }

  @Override
  public ResponseEntity<PermisosDto> validateRole(UsuarioDto usuarioDto) {
    ResponseEntity<PermisosDto> responseEntity;
    PermisosDto permisosDto = new PermisosDto();
    permisosDto.setMenus(new ArrayList<>());

    Usuario usuario = usuarioDao.findByCodigo(usuarioDto.getCodigo());
    permisosDto.setRol(usuario.getIdRol().getDescripcion());
    permisosDto.setNombreUsuario(usuario.getNombre());
    if (usuario.getIdRol().getDescripcion().equals("Paciente")) {
      List<Paciente> pacientes = patientDao.findByDocument(usuarioDto.getCodigo());

        if (!pacientes.isEmpty()) {
            permisosDto.setIdPatient(pacientes.get(0).getId());
        }
    }

    List<Menu> menus = menuDao.findByCodigoUsuario(usuarioDto.getCodigo());
    if (!menus.isEmpty()) {
      menus.forEach(menu -> {
        if (Objects.isNull(menu.getIdMenuPadre())) {
          menuPadreDto = MenuDto.builder().nombreMenu(menu.getDescripcion())
              .menuHijo(new ArrayList<>())
              .url(menu.getUrl())
              .build();
          menus.forEach(menuDto -> {
            if (menu.getId().equals(menuDto.getIdMenuPadre())) {
              MenuDto menuHijoDto = MenuDto.builder()
                  .nombreMenu(menuDto.getDescripcion())
                  .url(menuDto.getUrl())
                  .build();

              permisoMenuDao.findByIdRolAndIdMenu(usuario.getIdRol().getId(), menuDto.getId()).forEach(permisoMenu -> {
                if (permisoMenu.getHabilitado()) {
                    menuHijoDto.setCrear(permisoMenu.getCrear());
                    menuHijoDto.setEditar(permisoMenu.getEditar());
                    menuHijoDto.setEliminar(permisoMenu.getEliminar());
                    menuHijoDto.setConsultar(permisoMenu.getConsultar());
				}
              });

              menuPadreDto.getMenuHijo().add(menuHijoDto);
            }
          });
          if (!permisosDto.getMenus().contains(menuPadreDto)) {
            permisosDto.getMenus().add(menuPadreDto);
          }
        }
      });

      responseEntity = ResponseEntity.status(HttpStatus.OK).body(permisosDto);
      return responseEntity;
    }

    return null;
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

  @Override
  public ResponseEntity<String> resetPassword(UsuarioPasswordDto usuarioPasswordDto) {
    try {
      Optional.of(usuarioDao.findByCodigo(usuarioPasswordDto.getUsuario())).
          ifPresent(usuario -> {
            if (usuario.getClave().equals(usuarioPasswordDto.getClave())) {
              usuario.setClave(usuarioPasswordDto.getNuevaClave());
              usuarioDao.save(usuario);
            }
          });
      return ResponseEntity.status(HttpStatus.OK).body("Contraseña actualizada con éxito");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la contraseña");
    }
  }
}
