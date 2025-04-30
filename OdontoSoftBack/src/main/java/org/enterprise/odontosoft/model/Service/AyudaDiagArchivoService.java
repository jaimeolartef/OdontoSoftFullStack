package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Entity.AyudaDiagnosticaArchivo;

import java.util.List;

public interface AyudaDiagArchivoService {

	 List<AyudaDiagnosticaArchivo> getAllAyudaDiagnosticaArchivo();
	AyudaDiagnosticaArchivo saveAyudaDiagnosticaArchivo(AyudaDiagnosticaArchivo ayudaDiagnostica);
	 void deleteAyudaDiagnosticaArchivo(Integer id);
	AyudaDiagnosticaArchivo getAyudaDiagnosticaArchivoById(Integer id);
}
