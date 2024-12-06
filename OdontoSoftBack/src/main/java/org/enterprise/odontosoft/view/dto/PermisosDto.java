package org.enterprise.odontosoft.view.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermisosDto {

  private String rol;
  private String nombreUsuario;
  private Integer idPatient;

  private List<MenuDto> menus;
}
