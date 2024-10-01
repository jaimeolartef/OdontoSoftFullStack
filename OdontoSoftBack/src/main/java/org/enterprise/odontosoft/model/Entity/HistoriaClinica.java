package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "historiaclinica")
public class HistoriaClinica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('historiaclinica_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idpaciente", nullable = false)
    private Paciente idpaciente;

    @Column(name = "motivoconsulta", length = Integer.MAX_VALUE)
    private String motivoconsulta;

    @Column(name = "enfermedadactual", length = Integer.MAX_VALUE)
    private String enfermedadactual;

    @Column(name = "ultimomedicotratante", length = Integer.MAX_VALUE)
    private String ultimomedicotratante;

    @Column(name = "observacionantec", length = Integer.MAX_VALUE)
    private String observacionantec;

    @Column(name = "observacionantecodon", length = Integer.MAX_VALUE)
    private String observacionantecodon;

    @Column(name = "observacion", length = Integer.MAX_VALUE)
    private String observacion;

    @Column(name = "observacionanafunc", length = Integer.MAX_VALUE)
    private String observacionanafunc;

    @Column(name = "observacionexaestomat", length = Integer.MAX_VALUE)
    private String observacionexaestomat;

    @Column(name = "observacionodontograma", length = Integer.MAX_VALUE)
    private String observacionodontograma;

    @Column(name = "observacionexaperiodontal", length = Integer.MAX_VALUE)
    private String observacionexaperiodontal;

    @Column(name = "observacionanalisisoclu", length = Integer.MAX_VALUE)
    private String observacionanalisisoclu;

    @Column(name = "observacionayudadiag", length = Integer.MAX_VALUE)
    private String observacionayudadiag;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idusuariocreacion", nullable = false)
    private Usuario idusuariocreacion;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "atmmusculatura", nullable = false)
    private Boolean atmmusculatura = false;

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
    private Boolean habilitado;

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<AcoplamientoDienteAnt> acoplamientodienteants = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<AnalisisOclusion> analisisoclusions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<AnalisisFuncional> analisisfuncionals = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<AntecedentePaciente> antecedentepacientes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<AyudaDiagnostica> ayudadiagnosticas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<ContactoOclusalesMov> contactooclusalesmovs = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<Diagnostico> diagnosticos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<ExamenDental> examendentals = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<ExamenEstomatologico> examenestomatologicos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<ExamenPeriodontal> examenperiodontals = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<HabitoPaciente> habitopacientes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<HistoriAcaries> historiacaries = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<Odontograma> odontogramas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<PlanTratamiento> plantratamientos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idhistoriaclinica")
    private Set<SignoVital> signovitals = new LinkedHashSet<>();

}