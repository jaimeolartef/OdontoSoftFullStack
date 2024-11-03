package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.TipoTratamiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoTratamientoDao extends JpaRepository<TipoTratamiento, Integer> {
	List<TipoTratamiento> findAllByHabilitadoTrue();
}
