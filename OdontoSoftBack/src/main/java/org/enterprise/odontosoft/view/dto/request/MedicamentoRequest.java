package org.enterprise.odontosoft.view.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicamentoRequest {

	private String codigo;
	private String nombre;
	private String principioActivo;
	private String concentracion;
	private String formaFarmaceutica;
	private String viaAdministracion;
	private String laboratorio;
	private String registroInvima;
	private BigDecimal precioUnitario;
	private String unidadMedida;
	private Boolean requiereReceta;
	private String contraindicaciones;
	private String efectosSecundarios;
	private Boolean habilitado;
}