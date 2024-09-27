package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.*;
import org.enterprise.odontosoft.model.Dao.*;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
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

    private static final Logger logger = LoggerFactory.getLogger(MedicalHistoryControllerControllerImpl.class);

    @Override
    public ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            List<HistoriaClinica> historiaClinicas = historiaClinicaDao.findByPacienteId(historiaClinicaRequest.getIdpaciente());
            if (!historiaClinicas.isEmpty()) {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HistoriaClinicaResponse(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Ya existe una historia clínica para el paciente proporcionado"));
                return responseEntity;
            }
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

    public void saveDetailsMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
    try {
        // Guardar acoplamientodienteants
        historiaClinicaRequest.getAcoplamientodienteants().forEach(acoplamiento -> {
            acoplamiento.setIdhistoriaclinica(historiaClinicaRequest.getId());
            acoplamiento.setHabilitado(true);
            acoplamientoDienteAntDao.save(AcoplamientoDienteAntMapper.toEntity(acoplamiento));
        });

        // Guardar analisisoclusions
        historiaClinicaRequest.getAnalisisoclusions().forEach(analisis -> {
            analisis.setIdhistoriaclinica(historiaClinicaRequest.getId());
            analisis.setHabilitado(true);
            analisisOclusionDao.save(AnalisisOclusionMapper.toEntity(analisis));
        });

        // Guardar antecedentepacientes
        historiaClinicaRequest.getAntecedentepacientes().forEach(antecedente -> {
            antecedente.setIdhistoriaclinica(historiaClinicaRequest.getId());
            antecedente.setHabilitado(true);
            antecedentePacienteDao.save(AntecedentePacienteMapper.toEntity(antecedente));
        });

        // Guardar ayudadiagnosticas
        historiaClinicaRequest.getAyudadiagnosticas().forEach(ayuda -> {
            ayuda.setIdhistoriaclinica(historiaClinicaRequest.getId());
            ayudaDiagnosticaDao.save(AyudaDiagnosticaMapper.toEntity(ayuda));
        });

        // Guardar contactooclusalesmovs
        historiaClinicaRequest.getContactooclusalesmovs().forEach(contacto -> {
            contacto.setIdhistoriaclinica(historiaClinicaRequest.getId());
            contacto.setHabilitado(true);
            contactoOclusalMovDao.save(ContactoOclusalesMovMapper.toEntity(contacto));
        });

        // Guardar diagnosticos
        historiaClinicaRequest.getDiagnosticos().forEach(diagnostico -> {
            diagnostico.setIdhistoriaclinica(historiaClinicaRequest.getId());
            diagnostico.setHabilitado(true);
            diagnosticoDao.save(DiagnosticoMapper.toEntity(diagnostico));
        });

        // Guardar examendentals
        historiaClinicaRequest.getExamendentals().forEach(examen -> {
            examen.setIdhistoriaclinica(historiaClinicaRequest.getId());
            examen.setHabilitado(true);
            examenDentalDao.save(ExamenDentalMapper.toEntity(examen));
        });

        // Guardar examenestomatologicos
        historiaClinicaRequest.getExamenestomatologicos().forEach(examen -> {
            examen.setIdhistoriaclinica(historiaClinicaRequest.getId());
            examen.setHabilitado(true);
            examenEstomatologicoDao.save(ExamenEstomatologicoMapper.toEntity(examen));
        });

        // Guardar examenperiodontals
        historiaClinicaRequest.getExamenperiodontals().forEach(examen -> {
            examen.setIdhistoriaclinica(historiaClinicaRequest.getId());
            examen.setHabilitado(true);
            examenPeriodontalDao.save(ExamenPeriodontalMapper.toEntity(examen));
        });

        // Guardar habitopacientes
        historiaClinicaRequest.getHabitopacientes().forEach(habito -> {
            habito.setIdhistoriaclinica(historiaClinicaRequest.getId());
            habito.setHabilitado(true);
            habitoPacienteDao.save(HabitoPacienteMapper.toEntity(habito));
        });

        // Guardar historiacaries
        historiaClinicaRequest.getHistoriacaries().forEach(historia -> {
            historia.setIdhistoriaclinica(historiaClinicaRequest.getId());
            historia.setHabilitado(true);
            historiaCariesDao.save(HistoriAcariesMapper.toEntity(historia));
        });

        // Guardar odontogramas
        historiaClinicaRequest.getOdontogramas().forEach(odontograma -> {
            odontograma.setIdhistoriaclinica(historiaClinicaRequest.getId());
            odontograma.setHabilitado(true);
            Integer id = odontogramaDao.save(OdontogramaMapper.toEntity(odontograma)).getId();
            odontograma.getDetalleodontogramas().forEach(detalle -> {
                detalle.setIdodontograma(id);
                detalleOdontogramaDao.save(DetalleOdontogramaMapper.toEntity(detalle));
            });
        });



        // Guardar plantratamientos
        historiaClinicaRequest.getPlantratamientos().forEach(plan -> {
            plan.setIdhistoriaclinica(historiaClinicaRequest.getId());
            planTratamientoDao.save(PlanTratamientoMapper.toEntity(plan));
        });

        // Guardar signovitals
        historiaClinicaRequest.getSignovitals().forEach(signo -> {
            signo.setIdhistoriaclinica(historiaClinicaRequest.getId());
            signo.setHabilitado(true);
            signoVitalDao.save(SignoVitalMapper.toEntity(signo));
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
