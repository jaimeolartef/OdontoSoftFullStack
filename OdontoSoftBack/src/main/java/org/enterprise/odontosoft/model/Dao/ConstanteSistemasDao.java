package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Cita;
import org.enterprise.odontosoft.model.Entity.ConstanteSistema;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ConstanteSistemasDao extends CrudRepository<ConstanteSistema, Integer> {

	@Query("SELECT c FROM ConstanteSistema c")
	List<ConstanteSistema> findAll();
}
