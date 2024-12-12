package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Diagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DiagnosticoDao extends JpaRepository<Diagnostico, Integer> {

	@Modifying
	@Transactional
	@Query("DELETE FROM Diagnostico d WHERE d.idhistoriaclinica.id = :idHistoriaClinica")
		void deleteByIdHistoriaClinica(Integer idHistoriaClinica);
}
