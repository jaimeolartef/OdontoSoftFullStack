package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "analisisoclusion")
public class AnalisisOclusion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('analisisoclusion_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idhistoriaclinica", nullable = false)
    private HistoriaClinica idhistoriaclinica;

    @Column(name = "fechaexamen")
    private LocalDateTime fechaexamen;

    @Column(name = "relacionmolarderecha", length = Integer.MAX_VALUE)
    private String relacionmolarderecha;

    @Column(name = "relacionmolarizquierda", length = Integer.MAX_VALUE)
    private String relacionmolarizquierda;

    @Column(name = "relacioncaninaderecha", length = Integer.MAX_VALUE)
    private String relacioncaninaderecha;

    @Column(name = "relacioncaninaizquierda", length = Integer.MAX_VALUE)
    private String relacioncaninaizquierda;

    @Column(name = "sobremordidahorizontal", precision = 3, scale = 2)
    private BigDecimal sobremordidahorizontal;

    @Column(name = "dientesausentes")
    private Boolean dientesausentes;

    @Column(name = "contactoinicialrc")
    private Boolean contactoinicialrc;

    @Column(name = "sobremordidavertical", precision = 3, scale = 2)
    private BigDecimal sobremordidavertical;

    @Column(name = "soportepostadecu")
    private Boolean soportepostadecu;

    @Column(name = "deflexionmandibular")
    private Boolean deflexionmandibular;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idusuariocreacion", nullable = false)
    private Usuario idusuariocreacion;

    @NotNull
    @Column(name = "fechacreacion", nullable = false)
    private LocalDateTime fechacreacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idusuariomodificacion")
    private Usuario idusuariomodificacion;

    @Column(name = "fechamodificacion")
    private LocalDateTime fechamodificacion;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "habilitado", nullable = false)
    private Boolean habilitado = false;

}