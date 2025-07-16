package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.FormulaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FormulaMedicaDao extends JpaRepository<FormulaMedica, Long> {

	//para buscar por historia clínica
	@Query("SELECT f FROM FormulaMedica f WHERE f.idhistoriaclinica.id = ?1")
	List<FormulaMedica> findByHistoriaClinicaId(Integer idHistoriaClinica);
}
