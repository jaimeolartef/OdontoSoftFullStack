package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.dao.MedicamentoDao;
import org.enterprise.odontosoft.model.entity.Medicamento;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicamentoServiceImpl implements MedicamentoService {

	private final MedicamentoDao medicamentoDao;

	public MedicamentoServiceImpl(MedicamentoDao medicamentoDao) {
		this.medicamentoDao = medicamentoDao;
	}

	@Override
	public List<Medicamento> findAll() {
		return medicamentoDao.findAll();
	}

	@Override
	public Optional<Medicamento> findById(Long id) {
		return medicamentoDao.findById(id);
	}

	@Override
	public Medicamento save(Medicamento medicamento) {
		return medicamentoDao.save(medicamento);
	}

	@Override
	public void deleteById(Long id) {
		medicamentoDao.deleteById(id);
	}
}
