package org.enterprise.odontosoft.view.dto.response;


import lombok.*;
import lombok.experimental.SuperBuilder;
import org.enterprise.odontosoft.view.dto.MensajeValidation;

import java.time.LocalDateTime;

@SuperBuilder
@NoArgsConstructor
@Builder
@Getter
@Setter
@AllArgsConstructor
public class AyudaDiagnosticaArchivoResponse extends MensajeValidation {

	private Integer id;
	private byte[] archivoContenido;
	private String archivoNombre;
	private String archivoTipo;
	private Long archivoTamanio;
	private LocalDateTime fechaCreacion;

	public AyudaDiagnosticaArchivoResponse(String codigoValidacion, String mensajeValidacion) {
		super(codigoValidacion, mensajeValidacion);
	}
}