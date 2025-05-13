package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.dao.HistoriaClinicaDao;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService {

	private final HistoriaClinicaDao historiaClinicaDao;

	public MedicalHistoryServiceImpl(HistoriaClinicaDao historiaClinicaDao) {
		this.historiaClinicaDao = historiaClinicaDao;
	}

	@Override
	public List<HistoriaClinica> getMedicalHistoryByIdPatient(Integer idPatient) {
		return historiaClinicaDao.findByPacienteId(idPatient);
	}
}
