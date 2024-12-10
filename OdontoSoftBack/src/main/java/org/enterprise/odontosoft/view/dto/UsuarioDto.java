package org.enterprise.odontosoft.view.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDto {

    private Integer id;
    private String nombre;
    private String clave;
    private Boolean habilitado;
    private String codigo;
    private Integer idRol;
    private String token;

    @Email(message = "Correo electrónico no válido")
    private String correo;

}
