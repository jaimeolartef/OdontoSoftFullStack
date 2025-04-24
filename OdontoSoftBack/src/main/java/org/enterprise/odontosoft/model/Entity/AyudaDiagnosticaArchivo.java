package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "ayudadiagnosticaarchivo")
public class AyudaDiagnosticaArchivo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnDefault("nextval('ayudadiagnosticaarchivo_id_seq')")
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "archivo_contenido")
	private byte[] archivoContenido;

	@Size(max = 255)
	@Column(name = "archivo_nombre")
	private String archivoNombre;

	@Size(max = 100)
	@Column(name = "archivo_tipo", length = 100)
	private String archivoTipo;

	@Column(name = "archivo_tamano")
	private Long archivoTamano;

	@ColumnDefault("CURRENT_TIMESTAMP")
	@Column(name = "fecha_creacion")
	private Instant fechaCreacion;

	@OneToMany(mappedBy = "idayudadiagnosticaarchivo")
	private Set<AyudaDiagnostica> ayudadiagnosticas = new LinkedHashSet<>();

}