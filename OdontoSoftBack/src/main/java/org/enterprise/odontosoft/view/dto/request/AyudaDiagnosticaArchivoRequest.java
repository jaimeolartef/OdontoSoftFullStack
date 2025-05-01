package org.enterprise.odontosoft.view.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Builder
@Getter
@Setter
@AllArgsConstructor
public class AyudaDiagnosticaArchivoRequest {

	private Integer id;
	private byte[] archivoContenido;
	private String archivoNombre;
	private String archivoTipo;
	private Long archivoTamanio;
	private LocalDateTime fechaCreacion;

}