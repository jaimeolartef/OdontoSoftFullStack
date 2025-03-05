package org.enterprise.odontosoft.model.Service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.Dao.DisponibilidadDao;
import org.enterprise.odontosoft.model.Entity.Disponibilidad;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DisponibilidadServiceImpl implements DisponibilidadService {

	private final DisponibilidadDao disponibilidadDao;

	@Override
	public List<Disponibilidad> findByIdMedicoAndMesAndAnio(Integer idDoctor, Integer month, Integer year) {
		return disponibilidadDao.findByIdMedicoAndMesAndAnio(idDoctor, month, year);
	}

	@Override
	public List<Disponibilidad> findByIdMedicoAndMesAndAnioAndDia(Integer idDoctor, Integer month, Integer year, Integer day) {
		return disponibilidadDao.findByIdMedicoAndMesAndAnioAndDia(idDoctor, month, year, day);
	}


	@Override
	public void saveAll(List<Disponibilidad> disponibilidad) {
		disponibilidadDao.saveAll(disponibilidad);
	}
}
