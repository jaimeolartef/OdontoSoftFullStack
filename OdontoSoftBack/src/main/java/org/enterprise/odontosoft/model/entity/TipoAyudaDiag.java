package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tipoayudadiag")
public class TipoAyudaDiag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('tipoayudadiag_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 10)
    @Column(name = "codigo", length = 10)
    private String codigo;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "habilitado", nullable = false)
    private Boolean habilitado = false;

    @OneToMany(mappedBy = "idtipoayudadiag")
    private Set<AyudaDiagnostica> ayudadiagnosticas = new LinkedHashSet<>();

    public String getCodigoDescripcion() {
        return String.join(" - ",codigo,descripcion).trim();
    }
}