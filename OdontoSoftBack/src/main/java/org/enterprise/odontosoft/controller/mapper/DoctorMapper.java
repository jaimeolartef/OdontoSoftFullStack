package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.Medico;
import org.enterprise.odontosoft.view.dto.response.DoctorResponse;

@UtilityClass
public class DoctorMapper {

	public DoctorResponse toDoctorResponse(Medico medico) {
		return DoctorResponse.builder()
				.idMedico(medico.getIdMedico())
				.nombre(medico.getNombre())
				.matricula(medico.getMatricula())
				.especialidad(medico.getEspecialidad())
				.build();
	}
}
