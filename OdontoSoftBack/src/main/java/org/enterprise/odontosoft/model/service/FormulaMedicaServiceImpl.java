package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.dao.FormulaMedicaDao;
import org.enterprise.odontosoft.model.entity.FormulaMedica;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormulaMedicaServiceImpl implements FormulaMedicaService {

	private final FormulaMedicaDao formulaMedicaDao;

	public FormulaMedicaServiceImpl(FormulaMedicaDao formulaMedicaDao) {
		this.formulaMedicaDao = formulaMedicaDao;
	}

	@Override
	public List<FormulaMedica> findAll() {
		return formulaMedicaDao.findAll();
	}

	@Override
	public List<FormulaMedica> findByHistoriaClinicaId(Integer idHistoriaClinica) {
		return formulaMedicaDao.findByHistoriaClinicaId(idHistoriaClinica);
	}

	@Override
	public Optional<FormulaMedica> findById(Long id) {
		return formulaMedicaDao.findById(id);
	}

	@Override
	public FormulaMedica save(FormulaMedica formulaMedica) {
		return formulaMedicaDao.save(formulaMedica);
	}

	@Override
	public void deleteById(Long id) {
		formulaMedicaDao.deleteById(id);
	}
}
