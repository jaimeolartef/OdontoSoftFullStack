package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.SignoVital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SignoVitalDao extends JpaRepository<SignoVital, Long> {

	@Query("SELECT s FROM SignoVital s WHERE s.idhistoriaclinica.id = :idhistoriaclinica")
	Set<SignoVital> findByIdhistoriaclinica(Integer idhistoriaclinica);
}
