package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DiagnosticProceduresController {

	List<TipoAyudaDiagResponse> getAllDiagnosticProcedures();

	void saveFile(MultipartFile file, Integer idTipoAyudaDiag);
}
