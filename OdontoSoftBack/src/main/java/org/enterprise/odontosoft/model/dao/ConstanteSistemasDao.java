package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.ConstanteSistema;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ConstanteSistemasDao extends CrudRepository<ConstanteSistema, Integer> {

	@Query("SELECT c FROM ConstanteSistema c")
	List<ConstanteSistema> findAll();
}
