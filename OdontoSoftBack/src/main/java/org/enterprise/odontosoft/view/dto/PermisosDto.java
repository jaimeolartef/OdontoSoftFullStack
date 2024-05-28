package org.enterprise.odontosoft.view.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class PermisosDto {

  private String rol;
  private String nombreUsuario;

  private List<MenuDto> menus;

  public PermisosDto(String rol, String nombreUsuario, List<MenuDto> menus) {
    this.rol = rol;
    this.nombreUsuario = nombreUsuario;
    this.menus = menus;
  }
}
