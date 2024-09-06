package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "examendental")
public class ExamenDental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('examendental_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idhistoriaclinica", nullable = false)
    private HistoriaClinica idhistoriaclinica;

    @Column(name = "fechaexamen")
    private LocalDate fechaexamen;

    @Size(max = 20)
    @Column(name = "denticion", length = 20)
    private String denticion;

    @Size(max = 20)
    @Column(name = "formarcosuperior", length = 20)
    private String formarcosuperior;

    @Size(max = 20)
    @Column(name = "formarcoinferior", length = 20)
    private String formarcoinferior;

    @Size(max = 20)
    @Column(name = "simetriarcosuperior", length = 20)
    private String simetriarcosuperior;

    @Size(max = 20)
    @Column(name = "simetriarcoinferior", length = 20)
    private String simetriarcoinferior;

    @Size(max = 20)
    @Column(name = "riesgocaries", length = 20)
    private String riesgocaries;

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