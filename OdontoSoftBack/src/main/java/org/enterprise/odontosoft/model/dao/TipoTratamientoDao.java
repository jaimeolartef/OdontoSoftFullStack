package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.TipoTratamiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoTratamientoDao extends JpaRepository<TipoTratamiento, Integer> {
	List<TipoTratamiento> findAllByHabilitadoTrue();
}
