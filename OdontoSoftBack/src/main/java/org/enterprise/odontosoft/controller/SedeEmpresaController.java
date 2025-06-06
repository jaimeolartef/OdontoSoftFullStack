package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.SedeEmpresaRequest;
import org.enterprise.odontosoft.view.dto.response.SedeEmpresaResponse;

import javax.validation.Valid;
import java.util.List;

public interface SedeEmpresaController {
	SedeEmpresaResponse saveSedeEmpresaEntity(SedeEmpresaRequest request);
	SedeEmpresaResponse getSedeEmpresaById(Integer id);
	List<SedeEmpresaResponse> getAllSedeEmpresa();
	List<SedeEmpresaResponse> getSedeEmpresabyEntidad(Integer idEntidad);
	SedeEmpresaResponse updateSedeEmpresaEntity(@Valid SedeEmpresaRequest request);
	SedeEmpresaResponse deleteById(Integer id);
}
