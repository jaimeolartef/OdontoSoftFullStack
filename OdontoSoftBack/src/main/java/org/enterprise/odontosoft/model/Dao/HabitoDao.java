package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Habito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HabitoDao extends JpaRepository<Habito, Integer> {

	@Query("SELECT h FROM Habito h WHERE h.habilitado = true")
	List<Habito> findAllByHabilitadoTrue();
}
