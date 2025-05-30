package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@Entity
@Table(name = "entidadprestadorasalud")
@NoArgsConstructor
@AllArgsConstructor
public class EntidadPrestadoraSalud {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idtipodocumento")
	private TipoDocumento tipoDocumento;

	@Column(name = "numerodocumento", nullable = false)
	private Integer numeroDocumento;

	@Column(name = "nombre", nullable = false)
	private String nombre;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idtipoentidad")
	private TipoEntidad tipoEntidad;

	@Column(name = "codigohabilitacionminsalud", nullable = false)
	private String codigoHabilitacionMinsalud;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idregimenadministra")
	private Regimen regimenAdministra;

	@Column(name = "direccion")
	private String direccion;

	@Column(name = "telefono")
	private String telefono;

	@Column(name = "sitioweb")
	private String sitioWeb;

	@Column(name = "correo")
	private String correo;

	@Column(name = "canalesatencion")
	private String canalesAtencion;

	@Column(name = "habilitado", nullable = false)
	private Boolean habilitado;
}