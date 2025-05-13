package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.AyudaDiagnostica;

import java.util.List;

public interface AyudaDiagnosticaService {

	List<AyudaDiagnostica> getAllAyudaDiagnostica();
	AyudaDiagnostica saveAyudaDiagnostica(AyudaDiagnostica ayudaDiagnostica);
	 void deleteAyudaDiagnostica(Integer id);
	AyudaDiagnostica getAyudaDiagnosticaById(Integer id);
}
