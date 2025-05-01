package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.AyudaDiagnosticaArchivoMapper;
import org.enterprise.odontosoft.controller.mapper.TipoAyudaDiagMapper;
import org.enterprise.odontosoft.model.Dao.AyudaDiagnosticaDao;
import org.enterprise.odontosoft.model.Dao.TipoAyudaDiagnosticaDao;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnostica;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnosticaArchivo;
import org.enterprise.odontosoft.model.Service.AyudaDiagArchivoService;
import org.enterprise.odontosoft.model.Service.AyudaDiagnosticaService;
import org.enterprise.odontosoft.view.dto.response.AyudaDiagnosticaArchivoResponse;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

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
	public ResponseEntity<List<TipoAyudaDiagResponse>> getAllDiagnosticProcedures() {
		ResponseEntity<List<TipoAyudaDiagResponse>> responseEntity = null;
		List<TipoAyudaDiagResponse> tipoAyudaDiagsResponse = new ArrayList<>();
		try {
			tipoAyudaDiagnosticaDao.findAll().forEach(tipoAyudaDiag -> {
				tipoAyudaDiagsResponse.add(TipoAyudaDiagMapper.toResponse(tipoAyudaDiag));
			});

			if (tipoAyudaDiagsResponse == null) {
				responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body((List<TipoAyudaDiagResponse>) new OdontogramaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró tipos de diagnóstico."));
			}
			responseEntity = ResponseEntity.status(HttpStatus.OK).body(tipoAyudaDiagsResponse);
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error getting medical history.", e);
		}
		return responseEntity;
	}

	@Override
	public ResponseEntity<AyudaDiagnosticaArchivoResponse> saveFile(MultipartFile file, Integer idAyudaDiag) {
		ResponseEntity<AyudaDiagnosticaArchivoResponse> responseEntity = null;
		try {
			// Validar el archivo
			if (file.isEmpty()) {
				responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AyudaDiagnosticaArchivoResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "El archivo esta vacio"));
			}

			// Validar tipo de archivo (puedes añadir más validaciones según tus requisitos)
			String contentType = file.getContentType();
			if (contentType == null || (!contentType.startsWith("image/") && !contentType.equals("application/pdf"))) {
				responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AyudaDiagnosticaArchivoResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "Tipo de archivo no permitido"));
			}

			// Obtener bytes del archivo
			byte[] fileBytes = file.getBytes();

			AyudaDiagnostica ayudaDiagnostica = ayudaDiagnosticaService.getAyudaDiagnosticaById(idAyudaDiag);

			Integer idAyudaDiagnosticaArchivo = null;
			if (Objects.nonNull(ayudaDiagnostica) && Objects.nonNull(ayudaDiagnostica.getIdayudadiagnosticaarchivo())) {
				idAyudaDiagnosticaArchivo = ayudaDiagnostica.getIdayudadiagnosticaarchivo().getId();
			}

			// Guardar archivo en la base de datos o sistema de archivos
			AyudaDiagnosticaArchivo ayudaDiagnosticaArchivo = ayudaDiagArchivoService.saveAyudaDiagnosticaArchivo(AyudaDiagnosticaArchivo.builder()
				.archivoContenido(fileBytes)
				.archivoNombre(file.getOriginalFilename())
				.archivoTamanio(file.getSize())
				.archivoTipo(contentType)
				.fechaCreacion(LocalDateTime.now())
				.id(idAyudaDiagnosticaArchivo)
				.build());

			if (Objects.nonNull(ayudaDiagnosticaArchivo)) {
				if (ayudaDiagnostica != null) {
					ayudaDiagnostica.setIdayudadiagnosticaarchivo(AyudaDiagnosticaArchivo.builder().id(ayudaDiagnosticaArchivo.getId()).build());
					ayudaDiagnosticaService.saveAyudaDiagnostica(ayudaDiagnostica);
				}
			}

			// Ejemplo de respuesta exitosa

			responseEntity =  ResponseEntity.status(HttpStatus.OK)
				.body(AyudaDiagnosticaArchivoMapper.toDto(ayudaDiagnosticaArchivo));
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error getting medical history.", e);
		}
		return responseEntity;
	}
}
