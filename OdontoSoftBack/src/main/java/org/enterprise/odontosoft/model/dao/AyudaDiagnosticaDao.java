package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.AyudaDiagnostica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AyudaDiagnosticaDao extends JpaRepository<AyudaDiagnostica, Integer> {

	@Modifying
	@Transactional
	@Query("DELETE FROM AyudaDiagnostica a WHERE a.idhistoriaclinica.id = :idHistoriaClinica")
	void deleteByIdHistoriaClinica(Integer idHistoriaClinica);
}
