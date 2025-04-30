package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoAyudaDiagMapper;
import org.enterprise.odontosoft.model.Dao.AyudaDiagnosticaDao;
import org.enterprise.odontosoft.model.Dao.TipoAyudaDiagnosticaDao;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnostica;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnosticaArchivo;
import org.enterprise.odontosoft.model.Service.AyudaDiagArchivoService;
import org.enterprise.odontosoft.model.Service.AyudaDiagnosticaService;
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
	public ResponseEntity<?> saveFile(MultipartFile file, Integer idAyudaDiag) {
		try {
			// Validar el archivo
			if (file.isEmpty()) {
				return ResponseEntity.badRequest().body("El archivo está vacío");
			}

			// Validar tipo de archivo (puedes añadir más validaciones según tus requisitos)
			String contentType = file.getContentType();
			if (contentType == null || (!contentType.startsWith("image/") && !contentType.equals("application/pdf"))) {
				return ResponseEntity.badRequest().body("Tipo de archivo no permitido");
			}

			// Obtener bytes del archivo
			byte[] fileBytes = file.getBytes();

			// Guardar archivo en la base de datos o sistema de archivos
			AyudaDiagnosticaArchivo ayudaDiagnosticaArchivo = ayudaDiagArchivoService.saveAyudaDiagnosticaArchivo(AyudaDiagnosticaArchivo.builder()
				.archivoContenido(fileBytes)
				.archivoNombre(file.getOriginalFilename())
				.archivoTamanio(file.getSize())
				.archivoTipo(contentType)
				.fechaCreacion(LocalDateTime.now())
				.build());

			if (Objects.nonNull(ayudaDiagnosticaArchivo)) {
				// Guardar la relación con el tipo de ayuda diagnóstica
				AyudaDiagnostica ayudaDiagnostica = ayudaDiagnosticaService.getAyudaDiagnosticaById(idAyudaDiag);
				if (ayudaDiagnostica != null) {
					ayudaDiagnostica.setIdayudadiagnosticaarchivo(AyudaDiagnosticaArchivo.builder().id(ayudaDiagnosticaArchivo.getId()).build());
					ayudaDiagnosticaService.saveAyudaDiagnostica(ayudaDiagnostica);
				}
			}

			// Ejemplo de respuesta exitosa
			Map<String, Object> response = new HashMap<>();
			response.put("message", "Archivo guardado correctamente");
			response.put("fileName", file.getOriginalFilename());
			response.put("fileSize", file.getSize());

			return ResponseEntity.ok(response);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Error al procesar el archivo: " + e.getMessage());
		}
	}
}
