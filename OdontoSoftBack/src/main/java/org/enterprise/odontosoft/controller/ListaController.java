package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.ListaResponse;

import java.util.List;

public interface ListaController {

	List<ListaResponse> getAllListas();

	List<ListaResponse> getAllActiveListas();

	ListaResponse getListaById(Integer id);

	ListaResponse getListaByCodigo(String codigo);
}
