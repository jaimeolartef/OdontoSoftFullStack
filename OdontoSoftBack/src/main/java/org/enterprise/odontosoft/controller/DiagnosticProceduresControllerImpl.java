package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.AyudaDiagnosticaArchivoMapper;
import org.enterprise.odontosoft.controller.mapper.TipoAyudaDiagMapper;
import org.enterprise.odontosoft.model.dao.TipoAyudaDiagnosticaDao;
import org.enterprise.odontosoft.model.entity.AyudaDiagnostica;
import org.enterprise.odontosoft.model.entity.AyudaDiagnosticaArchivo;
import org.enterprise.odontosoft.model.service.AyudaDiagArchivoService;
import org.enterprise.odontosoft.model.service.AyudaDiagnosticaService;
import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@Controller
public class DiagnosticProceduresControllerImpl implements DiagnosticProceduresController {

	private static final Logger logger = LoggerFactory.getLogger(DiagnosticProceduresControllerImpl.class);

	private final TipoAyudaDiagnosticaDao tipoAyudaDiagnosticaDao;
	private final AyudaDiagnosticaService ayudaDiagnosticaService;
	private final AyudaDiagArchivoService ayudaDiagArchivoService;

    @Override
    public List<TipoAyudaDiagResponse> getAllDiagnosticProcedures() {
        List<TipoAyudaDiagResponse> tipoAyudaDiagsResponse = new ArrayList<>();
        tipoAyudaDiagnosticaDao.findAll().forEach(tipoAyudaDiag ->
            tipoAyudaDiagsResponse.add(TipoAyudaDiagMapper.toResponse(tipoAyudaDiag))
        );
        return tipoAyudaDiagsResponse;
    }

    @Override
    public void saveFile(MultipartFile file, Integer idAyudaDiag) {
        AyudaDiagnosticaArchivo ayudaDiagnosticaArchivo = null;
        try {
            // Validar el archivo
            if (file.isEmpty()) {
                throw new IllegalArgumentException("El archivo no puede estar vacío");
            }

            // Validar tipo de archivo (puedes añadir más validaciones según tus requisitos)
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.startsWith("image/") && !contentType.equals("application/pdf"))) {
                throw new IllegalArgumentException("Tipo de archivo no permitido");
            }

            // Obtener bytes del archivo
            byte[] fileBytes = file.getBytes();

            AyudaDiagnostica ayudaDiagnostica = ayudaDiagnosticaService.getAyudaDiagnosticaById(idAyudaDiag);

            Integer idAyudaDiagnosticaArchivo = null;
            if (Objects.nonNull(ayudaDiagnostica) && Objects.nonNull(ayudaDiagnostica.getIdayudadiagnosticaarchivo())) {
                idAyudaDiagnosticaArchivo = ayudaDiagnostica.getIdayudadiagnosticaarchivo().getId();
            }

            // Guardar archivo en la base de datos o sistema de archivos
            ayudaDiagnosticaArchivo = ayudaDiagArchivoService.saveAyudaDiagnosticaArchivo(AyudaDiagnosticaArchivo.builder()
                .archivoContenido(fileBytes)
                .archivoNombre(file.getOriginalFilename())
                .archivoTamanio(file.getSize())
                .archivoTipo(contentType)
                .fechaCreacion(LocalDateTime.now())
                .id(idAyudaDiagnosticaArchivo)
                .build());

            if (ayudaDiagnosticaArchivo != null && ayudaDiagnostica != null) {
                ayudaDiagnostica.setIdayudadiagnosticaarchivo(
                    AyudaDiagnosticaArchivo.builder().id(ayudaDiagnosticaArchivo.getId()).build()
                );
                ayudaDiagnosticaService.saveAyudaDiagnostica(ayudaDiagnostica);
            }
        } catch (Exception e) {
            logger.error("Error getting medical history.", e);
        }
    }
}
