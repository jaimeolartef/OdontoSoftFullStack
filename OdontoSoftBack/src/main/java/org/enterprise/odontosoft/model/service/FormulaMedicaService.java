package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.FormulaMedica;

import java.util.List;
import java.util.Optional;

public interface FormulaMedicaService {
	List<FormulaMedica> findAll();
	Optional<FormulaMedica> findById(Long id);
	FormulaMedica save(FormulaMedica formulaMedica);
	void deleteById(Long id);
}
