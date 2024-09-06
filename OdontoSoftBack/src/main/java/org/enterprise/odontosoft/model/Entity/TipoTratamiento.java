package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tipotratamiento")
public class TipoTratamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('tipotratamiento_id_seq')")
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

    @OneToMany(mappedBy = "idtipotratam")
    private Set<PlanTratamiento> plantratamientos = new LinkedHashSet<>();

}