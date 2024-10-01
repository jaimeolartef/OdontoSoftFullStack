package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "analisisfuncional")
public class AnalisisFuncional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('analisisfuncional_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "idhistoriaclinica", nullable = false)
    private Integer idhistoriaclinica;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "masticacion", nullable = false)
    private Boolean masticacion = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "deglucion", nullable = false)
    private Boolean deglucion = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "fonacion", nullable = false)
    private Boolean fonacion = false;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "respiracion", nullable = false)
    private Boolean respiracion = false;

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