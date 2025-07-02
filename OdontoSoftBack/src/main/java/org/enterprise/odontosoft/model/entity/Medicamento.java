package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "medicamento")
public class Medicamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "codigo", nullable = false, unique = true, length = 50)
	private String codigo;

	@Column(name = "nombre", nullable = false, length = 300)
	private String nombre;

	@Column(name = "principioactivo", nullable = false, length = 200)
	private String principioActivo;

	@Column(name = "concentracion", length = 100)
	private String concentracion;

	@Column(name = "formafarmaceutica", nullable = false, length = 100)
	private String formaFarmaceutica;

	@Column(name = "viaadministracion", nullable = false, length = 50)
	private String viaAdministracion;

	@Column(name = "laboratorio", length = 200)
	private String laboratorio;

	@Column(name = "registroinvima", length = 50)
	private String registroInvima;

	@Column(name = "preciounitario", precision = 10, scale = 2)
	private BigDecimal precioUnitario;

	@Column(name = "unidadmedida", length = 20)
	private String unidadMedida;

	@Column(name = "requierereceta", nullable = false)
	private Boolean requiereReceta = true;

	@Column(name = "contraindicaciones", columnDefinition = "TEXT")
	private String contraindicaciones;

	@Column(name = "efectos_secundarios", columnDefinition = "TEXT")
	private String efectosSecundarios;

	@Column(name = "habilitado", nullable = false)
	private Boolean habilitado = true;
}
