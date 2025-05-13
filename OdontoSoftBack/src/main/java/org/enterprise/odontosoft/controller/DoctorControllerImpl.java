package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.DoctorMapper;
import org.enterprise.odontosoft.model.entity.Medico;
import org.enterprise.odontosoft.model.service.DoctorService;
import org.enterprise.odontosoft.view.dto.response.DoctorResponse;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@AllArgsConstructor
@Controller
public class DoctorControllerImpl implements DoctorController {

	private final DoctorService doctorService;

	public List<DoctorResponse> getAllDoctors() {
    List<Medico> medicos = doctorService.getAllDoctors();
    return medicos.stream()
                  .map(medico -> DoctorMapper.toDoctorResponse(medico))
                  .collect(Collectors.toList());
}

	public DoctorResponse getDoctorById(Integer id) {
		Medico medico = doctorService.getDoctorById(id);
		return DoctorResponse.builder()
			.idMedico(medico.getIdMedico())
			.nombre(medico.getNombre())
			.especialidad(medico.getEspecialidad())
			.matricula(medico.getMatricula())
			.idtipodocumento(medico.getIdtipodocumento())
			.documento(medico.getDocumento())
			.fechanacimiento(medico.getFechanacimiento())
			.direccionresidencia(medico.getDireccionresidencia())
			.ciudadresidencia(medico.getCiudadresidencia())
			.telefono(medico.getTelefono())
			.correo(medico.getCorreo())
			.build();
	}

	public DoctorResponse getDoctorByDocumento(String documento) {
		Medico medico = doctorService.getDoctorByDocumento(documento);
		if (Objects.isNull(medico)) {
			return null;
		}
		return DoctorResponse.builder()
			.idMedico(medico.getIdMedico())
			.nombre(medico.getNombre())
			.especialidad(medico.getEspecialidad())
			.matricula(medico.getMatricula())
			.idtipodocumento(medico.getIdtipodocumento())
			.documento(medico.getDocumento())
			.fechanacimiento(medico.getFechanacimiento())
			.direccionresidencia(medico.getDireccionresidencia())
			.ciudadresidencia(medico.getCiudadresidencia())
			.telefono(medico.getTelefono())
			.correo(medico.getCorreo())
			.build();
	}
}
