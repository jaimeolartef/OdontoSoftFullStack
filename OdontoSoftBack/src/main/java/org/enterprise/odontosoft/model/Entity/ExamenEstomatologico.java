package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "examenestomatologico")
public class ExamenEstomatologico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('examenestomatologico_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idhistoriaclinica")
    private HistoriaClinica idhistoriaclinica;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "labiosuperior", nullable = false)
    private Boolean labiosuperior = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "labioinferior", nullable = false)
    private Boolean labioinferior = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "comisura", nullable = false)
    private Boolean comisura = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "menton", nullable = false)
    private Boolean menton = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "frenillos", nullable = false)
    private Boolean frenillos = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "surcosvestibulares", nullable = false)
    private Boolean surcosvestibulares = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "carrilos", nullable = false)
    private Boolean carrilos = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "procesosalveolares", nullable = false)
    private Boolean procesosalveolares = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "regionfaringea", nullable = false)
    private Boolean regionfaringea = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "paladarblando", nullable = false)
    private Boolean paladarblando = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "paladarduro", nullable = false)
    private Boolean paladarduro = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "pisoboca", nullable = false)
    private Boolean pisoboca = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "dorsolengua", nullable = false)
    private Boolean dorsolengua = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "vientrelengua", nullable = false)
    private Boolean vientrelengua = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "glandulasparotidas", nullable = false)
    private Boolean glandulasparotidas = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "glandulassublinguales", nullable = false)
    private Boolean glandulassublinguales = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "glandulassubmaxilares", nullable = false)
    private Boolean glandulassubmaxilares = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "glandulassalivaresmenor", nullable = false)
    private Boolean glandulassalivaresmenor = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "maxilarsuperior", nullable = false)
    private Boolean maxilarsuperior = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "maxilarinferior", nullable = false)
    private Boolean maxilarinferior = false;

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