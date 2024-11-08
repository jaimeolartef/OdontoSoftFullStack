package org.enterprise.odontosoft.view.dto.response;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.enterprise.odontosoft.view.dto.MensajeValidation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HistoriaClinicaResponse extends MensajeValidation {

    public HistoriaClinicaResponse(String codigo, String mensaje) {
        super(codigo, mensaje);
    }

    private Integer id;
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
    private String idusuariocreacion;
    private Boolean atmmusculatura;
    private LocalDateTime fechacreacion;
    private String idusuariomodificacion;
    private LocalDateTime fechamodificacion;
    private Boolean habilitado;

    private List<AcoplamientoDienteAntResponse> acoplamientodienteants = new ArrayList<>();
    private List<AnalisisOclusionResponse> analisisoclusions = new ArrayList<>();
    private List<AnalisisFuncionalResponse> analisisfuncionals = new ArrayList<>();
    private List<AntecedentePacienteResponse> antecedentepacientes = new ArrayList<>();
    private List<AyudaDiagnosticaResponse> ayudadiagnosticas = new ArrayList<>();
    private List<ContactoOclusalesMovResponse> contactooclusalesmovs = new ArrayList<>();
    private List<DiagnosticoResponse> diagnosticos = new ArrayList<>();
    private List<ExamenDentalResponse> examendentals = new ArrayList<>();
    private List<ExamenEstomatologicoResponse> examenestomatologicos = new ArrayList<>();
    private List<ExamenPeriodontalResponse> examenperiodontals = new ArrayList<>();
    private List<HabitoPacienteResponse> habitopacientes = new ArrayList<>();
    private List<HistoriAcariesResponse> historiacaries = new ArrayList<>();
    private List<OdontogramaResponse> odontogramas = new ArrayList<>();
    private List<PlanTratamientoResponse> plantratamientos = new ArrayList<>();
    private List<SignoVitalResponse> signovitals = new ArrayList<>();
}
