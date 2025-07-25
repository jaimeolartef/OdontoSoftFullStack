package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.EstadoDiente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstadoDienteDao extends JpaRepository<EstadoDiente, Integer> {

	@Query("SELECT e FROM EstadoDiente e WHERE e.codigo = :codigo")
	Optional<EstadoDiente> findByCodigo(String codigo);
}
