package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.SedeEmpresa;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface SedeEmpresaDao extends CrudRepository<SedeEmpresa, Integer> {

	/**
	 * Finds all SedeEmpresa entities by the ID of the associated EntidadPrestadoraSalud.
	 *
	 * @param idEntidad the ID of the EntidadPrestadoraSalud
	 * @return a list of SedeEmpresa entities associated with the given EntidadPrestadoraSalud ID
	 */
	List<SedeEmpresa> findByEntidadPrestadoraSaludId(Integer idEntidad);
}