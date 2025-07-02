package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.EstadoMedicamento;

import java.util.List;
import java.util.Optional;

public interface EstadoMedicamentoService {
	List<EstadoMedicamento> findAll();
	Optional<EstadoMedicamento> findById(Long id);
	EstadoMedicamento save(EstadoMedicamento estadoMedicamento);
	void deleteById(Long id);
}
