package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "estadomedicamento")
public class EstadoMedicamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre", nullable = false, length = 50)
	private String nombre;

	@Column(name = "descripcion", length = 200)
	private String descripcion;

	@Column(name = "habilitado", nullable = false)
	private Boolean habilitado = true;
}
