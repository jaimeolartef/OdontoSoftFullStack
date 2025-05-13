package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HistoriaClinicaDao extends CrudRepository<HistoriaClinica, Integer> {

    @Query("SELECT h FROM HistoriaClinica h WHERE h.idpaciente.id = :idPaciente")
    List<HistoriaClinica> findByPacienteId(Integer idPaciente);
}
