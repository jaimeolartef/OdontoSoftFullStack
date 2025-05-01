package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnosticaArchivo;
import org.enterprise.odontosoft.view.dto.request.AyudaDiagnosticaArchivoRequest;
import org.enterprise.odontosoft.view.dto.response.AyudaDiagnosticaArchivoResponse;

@UtilityClass
public class AyudaDiagnosticaArchivoMapper {

	public static AyudaDiagnosticaArchivo toEntity(AyudaDiagnosticaArchivoRequest ayudaDiagnosticaArchivoResponse) {
		return AyudaDiagnosticaArchivo.builder()
			.id(ayudaDiagnosticaArchivoResponse.getId())
			.archivoNombre(ayudaDiagnosticaArchivoResponse.getArchivoNombre())
			.archivoContenido(ayudaDiagnosticaArchivoResponse.getArchivoContenido())
			.fechaCreacion(ayudaDiagnosticaArchivoResponse.getFechaCreacion())
			.archivoTamanio(ayudaDiagnosticaArchivoResponse.getArchivoTamanio())
			.archivoTipo(ayudaDiagnosticaArchivoResponse.getArchivoTipo())
			.build();
	}

	public static AyudaDiagnosticaArchivoResponse toDto(AyudaDiagnosticaArchivo ayudaDiagnosticaArchivo) {
		return AyudaDiagnosticaArchivoResponse.builder()
			.id(ayudaDiagnosticaArchivo.getId())
			.archivoNombre(ayudaDiagnosticaArchivo.getArchivoNombre())
			.archivoContenido(ayudaDiagnosticaArchivo.getArchivoContenido())
			.fechaCreacion(ayudaDiagnosticaArchivo.getFechaCreacion())
			.archivoTamanio(ayudaDiagnosticaArchivo.getArchivoTamanio())
			.archivoTipo(ayudaDiagnosticaArchivo.getArchivoTipo())
			.build();
	}

}
