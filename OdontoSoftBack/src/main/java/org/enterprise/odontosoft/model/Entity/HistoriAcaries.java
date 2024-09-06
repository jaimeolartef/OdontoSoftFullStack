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
@Table(name = "historiacaries")
public class HistoriAcaries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('historiacaries_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idhistoriaclinica", nullable = false)
    private HistoriaClinica idhistoriaclinica;

    @Column(name = "fechaexamen")
    private LocalDate fechaexamen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idtipocuadrante")
    private TipoCuadrante idtipocuadrante;

    @Column(name = "sanos")
    private Integer sanos;

    @Column(name = "cariados")
    private Integer cariados;

    @Column(name = "obturados")
    private Integer obturados;

    @Column(name = "perdidos")
    private Integer perdidos;

    @Column(name = "extraccionindicada")
    private Integer extraccionindicada;

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