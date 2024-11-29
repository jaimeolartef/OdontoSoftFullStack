package org.enterprise.odontosoft.controller;


import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.CitaMapper;
import org.enterprise.odontosoft.model.Dao.CitaDao;
import org.enterprise.odontosoft.model.Entity.Cita;
import org.enterprise.odontosoft.util.UtilDate;
import org.enterprise.odontosoft.view.dto.request.CitaRequest;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
public class AppointmentControllerImpl implements AppointmentController {

	private final CitaDao citaDao;

	private static final Logger logger = LoggerFactory.getLogger(AppointmentControllerImpl.class);

	@Override
	public List<CitaResponse> findByMedico(Integer idMedico, String fechaDia) {
		List<Cita> citas = citaDao.findByIdMedico(idMedico, UtilDate.convertToLocalDate(fechaDia));
		return citas.stream()
				.map(cita -> CitaMapper.toCitaResponse(cita))
				.collect(Collectors.toList());
	}

	@Override
	public CitaResponse updateAppointment(CitaRequest citaRequest) {
		CitaResponse citaResponse = null;
		try {
			Cita cita = citaDao.save(CitaMapper.toCita(citaRequest));
			citaRequest.setId(cita.getId());
			citaResponse = CitaMapper.toCitaResponse(cita);
		} catch (Exception e) {
			logger.error("Error creating medical history.", e);
		}

		return citaResponse;
	}
}
