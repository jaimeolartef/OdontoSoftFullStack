package org.enterprise.odontosoft.model.dao;

import jakarta.validation.constraints.Size;
import org.enterprise.odontosoft.model.entity.Medico;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MedicoDao extends CrudRepository<Medico, Integer> {
	Optional<Medico> getMedicoByDocumento(@Size(max = 30) String documento);
}
