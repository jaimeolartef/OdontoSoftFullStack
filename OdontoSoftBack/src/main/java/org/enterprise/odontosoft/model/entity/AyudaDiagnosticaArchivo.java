package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "ayudadiagnosticaarchivo")
@AllArgsConstructor
public class AyudaDiagnosticaArchivo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnDefault("nextval('ayudadiagnosticaarchivo_id_seq')")
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "archivocontenido")
	private byte[] archivoContenido;

	@Size(max = 255)
	@Column(name = "archivonombre")
	private String archivoNombre;

	@Size(max = 100)
	@Column(name = "archivotipo", length = 100)
	private String archivoTipo;

	@Column(name = "archivotamano")
	private Long archivoTamanio;

	@Column(name = "fechacreacion", nullable = false)
	private LocalDateTime fechaCreacion;

	@OneToMany(mappedBy = "idayudadiagnosticaarchivo")
	private Set<AyudaDiagnostica> ayudadiagnosticas = new LinkedHashSet<>();

}