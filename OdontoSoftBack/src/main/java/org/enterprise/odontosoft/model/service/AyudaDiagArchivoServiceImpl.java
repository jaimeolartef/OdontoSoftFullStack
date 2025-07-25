package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.AyudaDiagnosticaArchivoDao;
import org.enterprise.odontosoft.model.entity.AyudaDiagnosticaArchivo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AyudaDiagArchivoServiceImpl implements AyudaDiagArchivoService {

	public final AyudaDiagnosticaArchivoDao ayudaDiagnosticaArchivoDao;

	@Override
	public List<AyudaDiagnosticaArchivo> getAllAyudaDiagnosticaArchivo() {
		return ayudaDiagnosticaArchivoDao.findAll();
	}

	@Override
	public AyudaDiagnosticaArchivo saveAyudaDiagnosticaArchivo(AyudaDiagnosticaArchivo ayudaDiagnostica) {
		return ayudaDiagnosticaArchivoDao.save(ayudaDiagnostica);
	}

	@Override
	public void deleteAyudaDiagnosticaArchivo(Integer id) {
		ayudaDiagnosticaArchivoDao.deleteById(id);
	}

	@Override
	public AyudaDiagnosticaArchivo getAyudaDiagnosticaArchivoById(Integer id) {
		return ayudaDiagnosticaArchivoDao.findById(id).orElse(null);
	}
}
