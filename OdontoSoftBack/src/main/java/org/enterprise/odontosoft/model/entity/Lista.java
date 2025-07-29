package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "lista")
@NoArgsConstructor
@AllArgsConstructor
public class Lista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 10)
    private String codigo;

    @Column
    private String descripcion;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean habilitado = false;

    @OneToMany(mappedBy = "lista", cascade = CascadeType.ALL)
    private List<ListaDetalle> detalles;
}