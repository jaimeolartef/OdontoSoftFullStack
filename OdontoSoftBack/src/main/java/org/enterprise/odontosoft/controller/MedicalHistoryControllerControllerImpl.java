package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.enterprise.odontosoft.controller.mapper.*;
import org.enterprise.odontosoft.model.Dao.*;
import org.enterprise.odontosoft.model.Entity.*;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class MedicalHistoryControllerControllerImpl implements MedicalHistoryController {

    private final HistoriaClinicaDao historiaClinicaDao;
    private final AcoplamientoDienteAntDao acoplamientoDienteAntDao;
    private final AnalisisOclusionDao analisisOclusionDao;
    private final AntecedentePacienteDao antecedentePacienteDao;
    private final AyudaDiagnosticaDao ayudaDiagnosticaDao;
    private final ContactoOclusalMovDao contactoOclusalMovDao;
    private final DiagnosticoDao diagnosticoDao;
    private final ExamenDentalDao examenDentalDao;
    private final ExamenEstomatologicoDao examenEstomatologicoDao;
    private final ExamenPeriodontalDao examenPeriodontalDao;
    private final HabitoPacienteDao habitoPacienteDao;
    private final HistoriaCariesDao historiaCariesDao;
    private final OdontogramaDao odontogramaDao;
    private final PlanTratamientoDao planTratamientoDao;
    private final SignoVitalDao signoVitalDao;
    private final DetalleOdontogramaDao detalleOdontogramaDao;
    private final UsuarioDao usuarioDao;

    private static final Logger logger = LoggerFactory.getLogger(MedicalHistoryControllerControllerImpl.class);

    @Override
    public ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            HistoriaClinica historiaClinica = MedicalHistoryMapper.toEntity(historiaClinicaRequest);
            historiaClinica.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(historiaClinicaRequest.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(historiaClinicaRequest.getIdusuariomodificacion())){
                historiaClinica.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(historiaClinicaRequest.getIdusuariomodificacion()).getId()).build());
            }
            historiaClinica = historiaClinicaDao.save(historiaClinica);
            historiaClinicaRequest.setId(historiaClinica.getId());
            saveDetailsMedicalHistory(historiaClinicaRequest);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(MedicalHistoryMapper.toDtoLigth(historiaClinica));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating medical history.", e);
        }

        return responseEntity;
    }

    public void saveDetailsMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
    try {

        // Guardar antecedentepacientes
        historiaClinicaRequest.getAntecedentepacientes().forEach(antecedente -> {
            antecedente.setIdhistoriaclinica(historiaClinicaRequest.getId());
            antecedente.setHabilitado(true);
            AntecedentePaciente antecedentePaciente = AntecedentePacienteMapper.toEntity(antecedente);
            antecedentePaciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(antecedente.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(antecedente.getIdusuariomodificacion())){
                antecedentePaciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(antecedente.getIdusuariomodificacion()).getId()).build());
            }
            antecedentePacienteDao.save(antecedentePaciente);
        });

        // Guardar ayudadiagnosticas
        historiaClinicaRequest.getAyudadiagnosticas().forEach(ayuda -> {
            ayuda.setIdhistoriaclinica(historiaClinicaRequest.getId());
            AyudaDiagnostica ayudaDiagnostica = AyudaDiagnosticaMapper.toEntity(ayuda);
            ayudaDiagnostica.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(ayuda.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(ayuda.getIdusuariomodificacion())){
                ayudaDiagnostica.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(ayuda.getIdusuariomodificacion()).getId()).build());
            }
            ayudaDiagnosticaDao.save(ayudaDiagnostica);
        });

        // Guardar diagnosticos
        historiaClinicaRequest.getDiagnosticos().forEach(diagnostico -> {
            diagnostico.setIdhistoriaclinica(historiaClinicaRequest.getId());
            diagnostico.setHabilitado(true);
            Diagnostico diagnosticoEntity = DiagnosticoMapper.toEntity(diagnostico);
            diagnosticoEntity.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(diagnostico.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(diagnostico.getIdusuariomodificacion())){
                diagnosticoEntity.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(diagnostico.getIdusuariomodificacion()).getId()).build());
            }
            diagnosticoDao.save(diagnosticoEntity);
        });

        // Guardar examenestomatologicos
        historiaClinicaRequest.getExamenestomatologicos().forEach(examen -> {
            examen.setIdhistoriaclinica(historiaClinicaRequest.getId());
            examen.setHabilitado(true);
            ExamenEstomatologico examenEstomatologico = ExamenEstomatologicoMapper.toEntity(examen);
            examenEstomatologico.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(examen.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(examen.getIdusuariomodificacion())){
                examenEstomatologico.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(examen.getIdusuariomodificacion()).getId()).build());
            }
            examenEstomatologicoDao.save(examenEstomatologico);
        });

        // Guardar habitopacientes
        historiaClinicaRequest.getHabitopacientes().forEach(habito -> {
            habito.setIdhistoriaclinica(historiaClinicaRequest.getId());
            habito.setHabilitado(true);
            HabitoPaciente habitoPaciente = HabitoPacienteMapper.toEntity(habito);
            habitoPaciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(habito.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(habito.getIdusuariomodificacion())){
                habitoPaciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(habito.getIdusuariomodificacion()).getId()).build());
            }
            habitoPacienteDao.save(habitoPaciente);
        });

        // Guardar signovitals
        historiaClinicaRequest.getSignovitals().forEach(signo -> {
            signo.setIdhistoriaclinica(historiaClinicaRequest.getId());
            signo.setHabilitado(true);
            SignoVital signoVital = SignoVitalMapper.toEntity(signo);
            signoVital.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(signo.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(signo.getIdusuariomodificacion())){
                signoVital.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(signo.getIdusuariomodificacion()).getId()).build());
            }
            signoVitalDao.save(signoVital);
        });

    } catch (Exception e) {
        logger.error("Error al guardar los detalles de la historia clínica.", e);
        throw new RuntimeException("Error al guardar los detalles de la historia clínica", e);
    }
}

    @Override
    public ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryById(Integer id) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            HistoriaClinica historiaClinica = historiaClinicaDao.findById(id).orElse(null);
            historiaClinica.setSignovitals(signoVitalDao.findByIdhistoriaclinica(id));
            if (historiaClinica == null) {
                responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HistoriaClinicaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró la historia clínica"));
                return responseEntity;
            }
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(MedicalHistoryMapper.toDto(historiaClinica));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error getting medical history.", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<HistoriaClinicaResponse> updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            HistoriaClinica historiaClinica = historiaClinicaDao.save(MedicalHistoryMapper.toEntity(historiaClinicaRequest));
            historiaClinicaRequest.setId(historiaClinica.getId());
            saveDetailsMedicalHistory(historiaClinicaRequest);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(MedicalHistoryMapper.toDtoLigth(historiaClinica));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating medical history.", e);
        }

        return responseEntity;
    }
}
