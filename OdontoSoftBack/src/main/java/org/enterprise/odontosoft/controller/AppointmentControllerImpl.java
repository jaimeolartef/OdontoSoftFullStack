package org.enterprise.odontosoft.controller;


import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.CitaMapper;
import org.enterprise.odontosoft.model.Dao.CitaDao;
import org.enterprise.odontosoft.model.Entity.Cita;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
public class AppointmentControllerImpl implements AppointmentController {

	private final CitaDao citaDao;

	@Override
	public List<CitaResponse> findByMedico(Integer idMedico) {
		List<Cita> citas = citaDao.findByIdMedico(idMedico);
		return citas.stream()
				.map(cita -> CitaMapper.toCitaResponse(cita))
				.collect(Collectors.toList());
	}
}
