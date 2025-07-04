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

	@Column(name = "serviciosprestados")
	private String serviciosPrestados;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "identidadprestadora")
	private EntidadPrestadoraSalud entidadPrestadoraSalud;

}