package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "antecedente")
public class Antecedente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('antecedente_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "odontologico", nullable = false)
    private Boolean odontologico = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "habilitado", nullable = false)
    private Boolean habilitado = false;

    @OneToMany(mappedBy = "idantecedente")
    private Set<AntecedentePaciente> antecedentepacientes = new LinkedHashSet<>();

}