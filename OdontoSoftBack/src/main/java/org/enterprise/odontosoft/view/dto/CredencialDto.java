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
  @Size(min = 3, max = 20, message = "Clave debe tener entre 6 y 20 caracteres")
  private String clave;

  private String token;
}
