package org.enterprise.odontosoft.controller;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.enterprise.odontosoft.controller.mapper.*;
import org.enterprise.odontosoft.model.dao.*;
import org.enterprise.odontosoft.model.entity.*;
import org.enterprise.odontosoft.model.service.MedicalHistoryService;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.Objects;

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
    private final AnalisisFuncionalDao analisisFuncionalDao;

    private final MedicalHistoryService medicalHistoryService;

    private static final Logger logger = LoggerFactory.getLogger(MedicalHistoryControllerControllerImpl.class);

    @Override
    public HistoriaClinicaResponse createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        try {
            HistoriaClinica historiaClinica = MedicalHistoryMapper.toEntity(historiaClinicaRequest);
            historiaClinica.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(historiaClinicaRequest.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(historiaClinicaRequest.getIdusuariomodificacion())){
                historiaClinica.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(historiaClinicaRequest.getIdusuariomodificacion()).getId()).build());
            }
            historiaClinica = historiaClinicaDao.save(historiaClinica);
            historiaClinicaRequest.setId(historiaClinica.getId());
            saveDetailsMedicalHistory(historiaClinicaRequest);
            return MedicalHistoryMapper.toDtoLigth(historiaClinica);
        } catch (Exception e) {
            logger.error("Error creating medical history.", e);
        }
        return null;
    }

    private void saveDetailsMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        try {
            guadarAntecedentes(historiaClinicaRequest);
            guadarAyudasDiagnosticas(historiaClinicaRequest);
            guardarDiagnosticos(historiaClinicaRequest);
            guardarExamenesEstomatologicos(historiaClinicaRequest);
            guardarHabitosPacientes(historiaClinicaRequest);
            guardarSignosVitales(historiaClinicaRequest);
            guardarAnalisisFuncional(historiaClinicaRequest);
        } catch (Exception e) {
            logger.error("Error al guardar los detalles de la historia clínica.", e);
        }
    }

    private void guadarAntecedentes(HistoriaClinicaRequest historiaClinicaRequest) {
        historiaClinicaRequest.getAntecedentepacientes().forEach(antecedente -> {
            antecedente.setIdhistoriaclinica(historiaClinicaRequest.getId());
            antecedente.setHabilitado(true);
            AntecedentePaciente antecedentePaciente = AntecedentePacienteMapper.toEntity(antecedente);
            antecedentePaciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(antecedente.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(antecedente.getIdusuariomodificacion())) {
                antecedentePaciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(antecedente.getIdusuariomodificacion()).getId()).build());
            }
            antecedentePacienteDao.save(antecedentePaciente);
        });
    }

    private void guadarAyudasDiagnosticas(HistoriaClinicaRequest historiaClinicaRequest) {
        ayudaDiagnosticaDao.deleteByIdHistoriaClinica(historiaClinicaRequest.getId());

        historiaClinicaRequest.getAyudadiagnosticas().forEach(ayuda -> {
            ayuda.setIdhistoriaclinica(historiaClinicaRequest.getId());
            AyudaDiagnostica ayudaDiagnostica = AyudaDiagnosticaMapper.toEntity(ayuda);
            ayudaDiagnostica.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(ayuda.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(ayuda.getIdusuariomodificacion())) {
                ayudaDiagnostica.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(ayuda.getIdusuariomodificacion()).getId()).build());
            }
            ayudaDiagnosticaDao.save(ayudaDiagnostica);
        });
    }

    private void guardarDiagnosticos(HistoriaClinicaRequest historiaClinicaRequest) {
        diagnosticoDao.deleteByIdHistoriaClinica(historiaClinicaRequest.getId());

        historiaClinicaRequest.getDiagnosticos().forEach(diagnostico -> {
            diagnostico.setIdhistoriaclinica(historiaClinicaRequest.getId());
            diagnostico.setHabilitado(true);
            Diagnostico diagnosticoEntity = DiagnosticoMapper.toEntity(diagnostico);
            diagnosticoEntity.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(diagnostico.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(diagnostico.getIdusuariomodificacion())) {
                diagnosticoEntity.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(diagnostico.getIdusuariomodificacion()).getId()).build());
            }
            diagnosticoDao.save(diagnosticoEntity);
        });
    }

    private void guardarExamenesEstomatologicos(HistoriaClinicaRequest historiaClinicaRequest) {
        historiaClinicaRequest.getExamenestomatologicos().forEach(examen -> {
            examen.setIdhistoriaclinica(historiaClinicaRequest.getId());
            examen.setHabilitado(true);
            if (StringUtils.isBlank(examen.getIdusuariomodificacion()) || Objects.isNull(examen.getIdusuariomodificacion())) {
                examen.setIdusuariomodificacion(null);
                examen.setFechamodificacion(null);
            }
            ExamenEstomatologico examenEstomatologico = ExamenEstomatologicoMapper.toEntity(examen);
            examenEstomatologico.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(examen.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(examen.getIdusuariomodificacion())) {
                examenEstomatologico.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(examen.getIdusuariomodificacion()).getId()).build());
            }
            examenEstomatologicoDao.save(examenEstomatologico);
        });
    }

    private void guardarHabitosPacientes(HistoriaClinicaRequest historiaClinicaRequest) {
        historiaClinicaRequest.getHabitopacientes().forEach(habito -> {
            habito.setIdhistoriaclinica(historiaClinicaRequest.getId());
            habito.setHabilitado(true);
            HabitoPaciente habitoPaciente = HabitoPacienteMapper.toEntity(habito);
            habitoPaciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(habito.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(habito.getIdusuariomodificacion())) {
                habitoPaciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(habito.getIdusuariomodificacion()).getId()).build());
            }
            habitoPacienteDao.save(habitoPaciente);
        });
    }

    private void guardarSignosVitales(HistoriaClinicaRequest historiaClinicaRequest) {
        historiaClinicaRequest.getSignovitals().forEach(signo -> {
            if (Objects.isNull(signo.getIdhistoriaclinica())) {
                signo.setIdhistoriaclinica(historiaClinicaRequest.getId());
            }

            signo.setIdhistoriaclinica(historiaClinicaRequest.getId());
            signo.setHabilitado(true);
            if (StringUtils.isBlank(signo.getIdusuariomodificacion()) || Objects.isNull(signo.getIdusuariomodificacion())) {
                signo.setIdusuariomodificacion(null);
                signo.setFechamodificacion(null);
            }
            SignoVital signoVital = SignoVitalMapper.toEntity(signo);
            signoVital.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(signo.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(signo.getIdusuariomodificacion())) {
                signoVital.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(signo.getIdusuariomodificacion()).getId()).build());
            }
            signoVitalDao.save(signoVital);
        });
    }

    private void guardarAnalisisFuncional(HistoriaClinicaRequest historiaClinicaRequest) {
        historiaClinicaRequest.getAnalisisfuncionals().forEach(analisisFunc -> {
            analisisFunc.setIdhistoriaclinica(historiaClinicaRequest.getId());
            analisisFunc.setHabilitado(true);
            if (StringUtils.isBlank(analisisFunc.getIdusuariomodificacion()) || Objects.isNull(analisisFunc.getIdusuariomodificacion())) {
                analisisFunc.setIdusuariomodificacion(null);
                analisisFunc.setFechamodificacion(null);
            }
            AnalisisFuncional analisisFuncional = AnalisisFuncionalMapper.toEntity(analisisFunc);
            analisisFuncional.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(analisisFunc.getIdusuariocreacion()).getId()).build());
            if (Strings.isNotBlank(analisisFunc.getIdusuariomodificacion())) {
                analisisFuncional.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(analisisFunc.getIdusuariomodificacion()).getId()).build());
            }
            analisisFuncionalDao.save(analisisFuncional);
        });
    }

    @Override
    public HistoriaClinicaResponse getMedicalHistoryById(Integer id) {
        try {
            HistoriaClinica historiaClinica = historiaClinicaDao.findById(id).orElse(null);
            if (historiaClinica == null) {
                throw new jakarta.persistence.EntityNotFoundException("No se encontró la historia clínica");
            }
            historiaClinica.setSignovitals(signoVitalDao.findByIdhistoriaclinica(id));
            return MedicalHistoryMapper.toDto(historiaClinica);
        } catch (Exception e) {
            logger.error("Error getting medical history.", e);
            throw e;
        }
    }

    @Override
    public HistoriaClinicaResponse getMedicalHistoryByIdPaciente(Integer idPaciente) {
        try {
            HistoriaClinica historiaClinica = medicalHistoryService.getMedicalHistoryByIdPatient(idPaciente).isEmpty() ? null : medicalHistoryService.getMedicalHistoryByIdPatient(idPaciente).get(0);
            if (historiaClinica == null) {
                return new HistoriaClinicaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró la historia clínica");
            }
            historiaClinica.setSignovitals(signoVitalDao.findByIdhistoriaclinica(historiaClinica.getId()));
            return MedicalHistoryMapper.toDto(historiaClinica);
        } catch (Exception e) {
            logger.error("Error getting medical history.", e);
            throw e;
        }
    }

    @Override
    public HistoriaClinicaResponse updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        try {
            HistoriaClinica historiaClinica = historiaClinicaDao.save(MedicalHistoryMapper.toEntity(historiaClinicaRequest));
            historiaClinicaRequest.setId(historiaClinica.getId());
            saveDetailsMedicalHistory(historiaClinicaRequest);
            return MedicalHistoryMapper.toDtoLigth(historiaClinica);
        } catch (Exception e) {
            logger.error("Error creating medical history.", e);
            throw e;
        }
    }
}
