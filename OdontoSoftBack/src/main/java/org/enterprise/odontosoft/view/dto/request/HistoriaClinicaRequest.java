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

    @NotNull
    private Integer idpaciente;

    private String motivoconsulta;
    private String enfermedadactual;
    private String ultimomedicotratante;
    private String observacionantec;
    private String observacionantecodon;
    private String observacion;
    private String observacionanafunc;
    private String observacionexaestomat;
    private String observacionodontograma;
    private String observacionexaperiodontal;
    private String observacionanalisisoclu;
    private String observacionayudadiag;

    @NotNull
    private Integer idusuariocreacion;

    @NotNull
    private Boolean atmmusculatura;

    @NotNull
    private LocalDateTime fechacreacion;

    private Integer idusuariomodificacion;
    private LocalDateTime fechamodificacion;

    @NotNull
    private Boolean habilitado;

    private List<AcoplamientoDienteAntRequest> acoplamientodienteants = new ArrayList<>();
    private List<AnalisisOclusionRequest> analisisoclusions = new ArrayList<>();
    private List<AntecedentePacienteRequest> antecedentepacientes = new ArrayList<>();
    private List<AyudaDiagnosticaRequest> ayudadiagnosticas = new ArrayList<>();
    private List<ContactoOclusalesMovRequest> contactooclusalesmovs = new ArrayList<>();
    private List<DiagnosticoRequest> diagnosticos = new ArrayList<>();
    private List<ExamenDentalRequest> examendentals = new ArrayList<>();
    private List<ExamenEstomatologicoRequest> examenestomatologicos = new ArrayList<>();
    private List<ExamenPeriodontalRequest> examenperiodontals = new ArrayList<>();
    private List<HabitoPacienteRequest> habitopacientes = new ArrayList<>();
    private List<HistoriAcariesRequest> historiacaries = new ArrayList<>();
    private List<OdontogramaRequest> odontogramas = new ArrayList<>();
    private List<PlanTratamientoRequest> plantratamientos = new ArrayList<>();
    private List<SignoVitalRequest> signovitals = new ArrayList<>();
}
