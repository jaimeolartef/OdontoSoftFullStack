package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.Medicamento;

import java.util.List;
import java.util.Optional;

public interface MedicamentoService {
	List<Medicamento> findAll();
	Optional<Medicamento> findById(Long id);
	Medicamento save(Medicamento medicamento);
	void deleteById(Long id);
}
