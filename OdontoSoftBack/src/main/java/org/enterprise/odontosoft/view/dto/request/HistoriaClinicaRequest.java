package org.enterprise.odontosoft.view.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class HistoriaClinicaRequest {

    private Integer id;
    private Integer idHistoriaClinica;

    @NotNull
    private Integer idPaciente;

    private String motivoConsulta;
    private String enfermedadActual;
    private String ultimomedicotratante;
    private String observacionAntec;
    private String observacionantecodon;
    private String observacion;
    private String observacionanafunc;

    @NotNull
    private String idusuariocreacion;

    @NotNull
    private Boolean atmmusculatura;

    @NotNull
    private LocalDateTime fechacreacion;

    private String idusuariomodificacion;
    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;

    private List<AntecedentePacienteRequest> antecedentepacientes = new ArrayList<>();
    private List<AyudaDiagnosticaRequest> ayudadiagnosticas = new ArrayList<>();
    private List<DiagnosticoRequest> diagnosticos = new ArrayList<>();
    private List<ExamenEstomatologicoRequest> examenestomatologicos = new ArrayList<>();
    private List<HabitoPacienteRequest> habitopacientes = new ArrayList<>();
    private List<SignoVitalRequest> signovitals = new ArrayList<>();
    private List<AnalisisFuncionalRequest> analisisfuncionals = new ArrayList<>();
}
