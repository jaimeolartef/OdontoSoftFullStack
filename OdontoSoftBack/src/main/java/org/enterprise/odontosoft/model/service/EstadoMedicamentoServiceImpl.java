package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.dao.EstadoMedicamentoDao;
import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoMedicamentoServiceImpl implements EstadoMedicamentoService {

	private final EstadoMedicamentoDao estadoMedicamentoDao;

	public EstadoMedicamentoServiceImpl(EstadoMedicamentoDao estadoMedicamentoDao) {
		this.estadoMedicamentoDao = estadoMedicamentoDao;
	}

	@Override
	public List<EstadoMedicamento> findAll() {
		return estadoMedicamentoDao.findAll();
	}

	@Override
	public Optional<EstadoMedicamento> findById(Long id) {
		return estadoMedicamentoDao.findById(id);
	}

	@Override
	public EstadoMedicamento save(EstadoMedicamento estadoMedicamento) {
		return estadoMedicamentoDao.save(estadoMedicamento);
	}

	@Override
	public void deleteById(Long id) {
		estadoMedicamentoDao.deleteById(id);
	}
}

