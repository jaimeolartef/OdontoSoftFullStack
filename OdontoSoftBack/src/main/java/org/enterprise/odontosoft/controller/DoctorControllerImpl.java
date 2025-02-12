package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.DoctorMapper;
import org.enterprise.odontosoft.model.Dao.MedicoDao;
import org.enterprise.odontosoft.view.dto.response.DoctorResponse;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Controller
public class DoctorControllerImpl implements DoctorController {

	private final MedicoDao medicoDao;

	public List<DoctorResponse> getAllDoctors() {
    List<Medico> medicos = (List<Medico>) medicoDao.findAll();
    return medicos.stream()
                  .map(medico -> DoctorMapper.toDoctorResponse(medico))
                  .collect(Collectors.toList());
}

	public DoctorResponse getDoctorById(Integer id) {
		Medico medico = medicoDao.findById(id).orElseThrow();
		return DoctorResponse.builder()
							 .idMedico(medico.getIdMedico())
							 .nombre(medico.getNombre())
							 .especialidad(medico.getEspecialidad())
							 .matricula(medico.getMatricula())
							 .build();
	}
}
