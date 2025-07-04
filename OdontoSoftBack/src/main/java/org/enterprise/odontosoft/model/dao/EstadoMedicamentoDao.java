package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstadoMedicamentoDao extends JpaRepository<EstadoMedicamento, Long> {

	/**
	 * Finds an EstadoMedicamento by its name.
	 *
	 * @param nombre the name of the EstadoMedicamento
	 * @return an Optional containing the EstadoMedicamento if found, or empty if not found
	 */
	@Query("SELECT e FROM EstadoMedicamento e WHERE e.nombre = ?1")
	Optional<EstadoMedicamento> findByNombre(String nombre);
}
