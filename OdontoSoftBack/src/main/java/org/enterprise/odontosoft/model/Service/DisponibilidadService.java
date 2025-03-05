package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Entity.Disponibilidad;

import java.util.List;

public interface DisponibilidadService {

	List<Disponibilidad> findByIdMedicoAndMesAndAnio(Integer idDoctor, Integer month, Integer year);

	List<Disponibilidad> findByIdMedicoAndMesAndAnioAndDia(Integer idDoctor, Integer month, Integer year, Integer day);

	void saveAll(List<Disponibilidad> disponibilidad);
}
