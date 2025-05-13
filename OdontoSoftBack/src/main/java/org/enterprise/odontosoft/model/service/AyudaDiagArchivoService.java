package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.AyudaDiagnosticaArchivo;

import java.util.List;

public interface AyudaDiagArchivoService {

	 List<AyudaDiagnosticaArchivo> getAllAyudaDiagnosticaArchivo();
	AyudaDiagnosticaArchivo saveAyudaDiagnosticaArchivo(AyudaDiagnosticaArchivo ayudaDiagnostica);
	 void deleteAyudaDiagnosticaArchivo(Integer id);
	AyudaDiagnosticaArchivo getAyudaDiagnosticaArchivoById(Integer id);
}
