package org.enterprise.odontosoft.view.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class CredencialDto {

  @NotBlank(message = "Usuario no puede ser vacío")
  private String usuario;

  @NotBlank(message = "Clave no puede ser vacía")
  private String clave;

  private String token;
}
