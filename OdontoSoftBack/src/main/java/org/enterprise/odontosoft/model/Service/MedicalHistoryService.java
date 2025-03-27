package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Entity.HistoriaClinica;

import java.util.List;

public interface MedicalHistoryService {

	List<HistoriaClinica> getMedicalHistoryByIdPatient(Integer idPatient);
}
