package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.Medicamento;
import org.enterprise.odontosoft.view.dto.request.MedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.MedicamentoResponse;

public class MedicamentoMapper {

	private MedicamentoMapper() {
		// Private constructor to prevent instantiation
	}

	public static MedicamentoResponse toResponse(Medicamento medicamento) {
		if (medicamento == null) {
			return null;
		}

		return MedicamentoResponse.builder()
			.id(medicamento.getId())
			.codigo(medicamento.getCodigo())
			.nombre(medicamento.getNombre())
			.principioActivo(medicamento.getPrincipioActivo())
			.concentracion(medicamento.getConcentracion())
			.formaFarmaceutica(medicamento.getFormaFarmaceutica())
			.viaAdministracion(medicamento.getViaAdministracion())
			.laboratorio(medicamento.getLaboratorio())
			.registroInvima(medicamento.getRegistroInvima())
			.precioUnitario(medicamento.getPrecioUnitario())
			.unidadMedida(medicamento.getUnidadMedida())
			.requiereReceta(medicamento.getRequiereReceta())
			.contraindicaciones(medicamento.getContraindicaciones())
			.efectosSecundarios(medicamento.getEfectosSecundarios())
			.habilitado(medicamento.getHabilitado())
			.build();
	}


	public static Medicamento toEntity(MedicamentoRequest medicamentoRequest) {
		if (medicamentoRequest == null) {
			return null;
		}

		Medicamento medicamento = new Medicamento();
		medicamento.setCodigo(medicamentoRequest.getCodigo());
		medicamento.setNombre(medicamentoRequest.getNombre());
		medicamento.setPrincipioActivo(medicamentoRequest.getPrincipioActivo());
		medicamento.setConcentracion(medicamentoRequest.getConcentracion());
		medicamento.setFormaFarmaceutica(medicamentoRequest.getFormaFarmaceutica());
		medicamento.setViaAdministracion(medicamentoRequest.getViaAdministracion());
		medicamento.setLaboratorio(medicamentoRequest.getLaboratorio());
		medicamento.setRegistroInvima(medicamentoRequest.getRegistroInvima());
		medicamento.setPrecioUnitario(medicamentoRequest.getPrecioUnitario());
		medicamento.setUnidadMedida(medicamentoRequest.getUnidadMedida());
		medicamento.setRequiereReceta(medicamentoRequest.getRequiereReceta());
		medicamento.setContraindicaciones(medicamentoRequest.getContraindicaciones());
		medicamento.setEfectosSecundarios(medicamentoRequest.getEfectosSecundarios());
		medicamento.setHabilitado(medicamentoRequest.getHabilitado());

		return medicamento;
	}
}
