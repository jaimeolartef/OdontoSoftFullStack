package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "contactooclusalesmov")
public class ContactoOclusalesMov {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('contactooclusalesmov_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idhistoriaclinica", nullable = false)
    private HistoriaClinica idhistoriaclinica;

    @Column(name = "fechaexamen")
    private LocalDate fechaexamen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idtipocontacoclumov")
    private TipoContactoOclusalMov idtipocontacoclumov;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "seleccion", nullable = false)
    private Boolean seleccion = false;

    @Column(name = "cuales", length = Integer.MAX_VALUE)
    private String cuales;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idusuariocreacion", nullable = false)
    private Usuario idusuariocreacion;

    @NotNull
    @Column(name = "fechacreacion", nullable = false)
    private LocalDate fechacreacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idusuariomodificacion")
    private Usuario idusuariomodificacion;

    @Column(name = "fechamodificacion")
    private LocalDate fechamodificacion;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "habilitado", nullable = false)
    private Boolean habilitado = false;

}