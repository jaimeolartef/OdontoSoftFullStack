package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.HistoriaClinica;

import java.util.List;

public interface MedicalHistoryService {

	List<HistoriaClinica> getMedicalHistoryByIdPatient(Integer idPatient);
}
