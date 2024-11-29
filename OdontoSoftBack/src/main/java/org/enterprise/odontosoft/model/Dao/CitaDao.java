package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Cita;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface CitaDao extends CrudRepository<Cita, Integer> {

	@Query("SELECT c FROM Cita c WHERE c.idMedico.idMedico = :idMedico and c.fecha = :fechaDia and c.habilitado = true")
	List<Cita> findByIdMedico(Integer idMedico, LocalDate fechaDia);
}
