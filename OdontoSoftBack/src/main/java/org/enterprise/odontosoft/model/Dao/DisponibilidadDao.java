package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DisponibilidadDao extends CrudRepository<Disponibilidad, Integer> {

	List<Disponibilidad> findByIdMedicoAndMesAndAnio(Integer idDoctor, Integer month, Integer year);

	List<Disponibilidad> findByIdMedicoAndMesAndAnioAndDia(Integer idDoctor, Integer month, Integer year, Integer day);
}
