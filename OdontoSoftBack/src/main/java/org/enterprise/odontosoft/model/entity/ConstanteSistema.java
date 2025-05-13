package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "constantesistema")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ConstanteSistema {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 50)
	private String codigo;

	@Column(nullable = false, length = 100)
	private String nombre;

	@Column(nullable = false, length = 100)
	private String valor;

	@Column(length = 500)
	private String descripcion;

	@Column(nullable = false)
	private Boolean habilitado;
}
