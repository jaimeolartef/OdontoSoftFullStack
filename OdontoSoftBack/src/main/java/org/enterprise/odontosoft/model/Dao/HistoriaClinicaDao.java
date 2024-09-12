package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HistoriaClinicaDao extends CrudRepository<HistoriaClinica, Integer> {

    @Query("SELECT h FROM HistoriaClinica h WHERE h.idpaciente.id = :idPaciente")
    List<HistoriaClinica> findByPacienteId(Integer idPaciente);
}
