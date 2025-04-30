package org.enterprise.odontosoft.model.Service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.Dao.AyudaDiagnosticaDao;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnostica;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AyudaDiagnosticaServiceImpl implements AyudaDiagnosticaService {

	public final AyudaDiagnosticaDao ayudaDiagnosticaDao;

	@Override
	public List<AyudaDiagnostica> getAllAyudaDiagnostica() {
		return ayudaDiagnosticaDao.findAll();
	}

	@Override
	public AyudaDiagnostica saveAyudaDiagnostica(AyudaDiagnostica ayudaDiagnostica) {
		return ayudaDiagnosticaDao.save(ayudaDiagnostica);
	}

	@Override
	public void deleteAyudaDiagnostica(Integer id) {
		ayudaDiagnosticaDao.deleteById(id);
	}

	@Override
	public AyudaDiagnostica getAyudaDiagnosticaById(Integer id) {
		return ayudaDiagnosticaDao.findById(id).orElse(null);
	}
}
