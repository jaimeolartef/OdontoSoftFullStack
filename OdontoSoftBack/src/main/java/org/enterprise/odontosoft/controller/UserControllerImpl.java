package org.enterprise.odontosoft.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.enterprise.odontosoft.model.dao.MenuDao;
import org.enterprise.odontosoft.model.dao.PatientDao;
import org.enterprise.odontosoft.model.dao.PermisoMenuDao;
import org.enterprise.odontosoft.model.dao.UsuarioDao;
import org.enterprise.odontosoft.model.entity.Menu;
import org.enterprise.odontosoft.model.entity.Paciente;
import org.enterprise.odontosoft.model.entity.Rol;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.model.service.EmailService;
import org.enterprise.odontosoft.view.dto.*;
import org.enterprise.odontosoft.view.security.UtilSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import java.security.SecureRandom;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Slf4j
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
  public CredencialDto login(@Valid @RequestBody CredencialDto credencial) {
    Usuario usuario = usuarioDao.findByCodigo(credencial.getUsuario());
    if (Objects.nonNull(usuario) && credencial.getClave().equals(usuario.getClave())) {
      String token = UtilSecurity.generateToken(credencial.getUsuario());
      return CredencialDto.builder().usuario(credencial.getUsuario()).token(token).build();
    } else {
      throw new jakarta.persistence.EntityNotFoundException("Usuario no encontrado o contraseña incorrecta");
    }
  }

  @Override
  public String recordarContrasenia(UsuarioRecordarDto usuarioRecordarDto) {
    Usuario usuario = usuarioDao.findByEmail(usuarioRecordarDto.getEmail());

    if (usuario != null) {
      String newPassword = generateRandomString(8);
      String subject = "Recuperación de contraseña";
      String text = "Hola " + usuario.getNombre() + ",\n\nTu contraseña es " + newPassword + ".\n\nSaludos,\nEquipo de Soporte.";
      usuario.setClave(UtilSecurity.encriptar(newPassword));
      emailService.sendUserCreationEmail(usuario.getCorreo(), subject, text);
      usuarioDao.save(usuario);
    } else {
      throw new jakarta.persistence.EntityNotFoundException("Usuario no encontrado con correo: " + usuarioRecordarDto.getEmail());
    }
    return MENSAJE_USUARIO;
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
  public String signup(UsuarioDto usuarioDto) {
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

      return MENSAJE_USUARIO;
    } else {
      throw new jakarta.persistence.EntityExistsException("El usuario ya existe con el código: " + usuarioDto.getCodigo());
    }
  }

  @Override
  public PermisosDto validateRole(UsuarioDto usuarioDto) {
    PermisosDto permisosDto = new PermisosDto();
    permisosDto.setMenus(new ArrayList<>());

    Usuario usuario = usuarioDao.findByCodigo(usuarioDto.getCodigo());
    if (usuario == null) {
        throw new jakarta.persistence.EntityNotFoundException("Usuario no encontrado con código: " + usuarioDto.getCodigo());
    }
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
                if (Boolean.TRUE.equals(permisoMenu.getHabilitado())) {
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

      return permisosDto;
    }

    return null;
  }

  @Override
  public void validateToken(UsuarioValidarDto usuarioValidarDto) {
    try {
      boolean validado = UtilSecurity.validateToken(usuarioValidarDto.getToken(), usuarioValidarDto.getUsuario());

      if (!validado) {
        throw new AccessDeniedException("Token inválido o usuario no autorizado");
      }
    } catch (Exception e) {
      log.error("Error al validar el token: {}", e.getMessage());
    }
  }

  @Override
  public String resetPassword(UsuarioPasswordDto usuarioPasswordDto) {
    try {
      Optional.of(usuarioDao.findByCodigo(usuarioPasswordDto.getUsuario())).
          ifPresent(usuario -> {
            if (usuario.getClave().equals(usuarioPasswordDto.getClave())) {
              usuario.setClave(usuarioPasswordDto.getNuevaClave());
              usuarioDao.save(usuario);
            }
          });
      return "Contraseña actualizada con éxito";
    } catch (Exception e) {
      log.error("Error al actualizar la contraseña");
      throw e;
    }
  }
}
