package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "listadetalle")
@NoArgsConstructor
@AllArgsConstructor
public class ListaDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idlista", nullable = false)
    private Lista lista;

    @Column(length = 10)
    private String codigo;

    @Column
    private String descripcion;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean habilitado = false;
}
