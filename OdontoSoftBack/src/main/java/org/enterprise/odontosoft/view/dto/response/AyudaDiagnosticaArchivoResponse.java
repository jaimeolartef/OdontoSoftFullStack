package org.enterprise.odontosoft.view.dto.response;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnostica;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@NoArgsConstructor
@Builder
@Getter
@Setter
@AllArgsConstructor
public class AyudaDiagnosticaArchivoResponse {

	private Integer id;
	private byte[] archivoContenido;
	private String archivoNombre;
	private String archivoTipo;
	private Long archivoTamanio;
	private LocalDateTime fechaCreacion;

}