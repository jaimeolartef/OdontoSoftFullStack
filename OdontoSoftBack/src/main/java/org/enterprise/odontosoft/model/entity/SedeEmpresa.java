package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotNull;


@Builder
@Getter
@Setter
@Entity
@Table(name = "sedesempresa")
@NoArgsConstructor
@AllArgsConstructor
public class SedeEmpresa {

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

	@Column(name = "direccion")
	private String direccion;

	@Column(name = "telefono")
	private String telefono;

	@Column(name = "correo")
	private String correo;

	@Column(name = "canalesatencion")
	private String canalesAtencion;

	@Column(name = "habilitado", nullable = false)
	private boolean habilitado;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "identidadprestadora")
	private EntidadPrestadoraSalud entidadPrestadoraSalud;

}