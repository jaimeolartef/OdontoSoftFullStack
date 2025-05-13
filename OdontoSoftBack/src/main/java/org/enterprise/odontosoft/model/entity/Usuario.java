package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuario")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnDefault("nextval('usuario_id_seq'::regclass)")
	@Column(name = "id", nullable = false)
	private Integer id;

	@Size(max = 50)
	@NotNull
	@Column(name = "nombre", nullable = false, length = 50)
	private String nombre;

	@NotNull
	@Column(name = "clave", nullable = false, length = Integer.MAX_VALUE)
	private String clave;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_rol", nullable = false)
	private Rol idRol;

	@NotNull
	@ColumnDefault("false")
	@Column(name = "habilitado", nullable = false)
	private Boolean habilitado = false;

	@Size(max = 20)
	@Column(name = "codigo", length = 20)
	private String codigo;

	@Size(max = 200)
	@Column(name = "correo", length = 200)
	private String correo;

	@OneToMany(mappedBy = "idusuariocreacion")
	private Set<HistoriaClinica> historiaClinicasUsuario = new LinkedHashSet<>();

	@OneToMany(mappedBy = "idusuariomodificacion")
	private Set<HistoriaClinica> historiaClinicasUsuarioMod = new LinkedHashSet<>();

}