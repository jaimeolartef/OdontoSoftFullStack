package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.ListaMapper;
import org.enterprise.odontosoft.model.entity.Lista;
import org.enterprise.odontosoft.model.service.ListaService;
import org.enterprise.odontosoft.view.dto.response.ListaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Controller
public class ListaControllerImpl implements ListaController {

	private static final Logger logger = LoggerFactory.getLogger(ListaControllerImpl.class);

	private final ListaService listaService;

	@Override
	public List<ListaResponse> getAllListas() {
		try {
			List<Lista> listas = listaService.findAll();
			if (listas.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron listas.");
			}
			return listas.stream()
				.map(ListaMapper::toResponse)
				.toList();
		} catch (Exception e) {
			logger.error("Error al obtener las listas.", e);
		}
		return List.of();
	}

	@Override
	public List<ListaResponse> getAllActiveListas() {
		try {
			List<Lista> listas = listaService.findAllActive();
			if (listas.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron listas activas.");
			}
			return listas.stream()
				.map(ListaMapper::toResponse)
				.toList();
		} catch (Exception e) {
			logger.error("Error al obtener las listas activas.", e);
		}
		return List.of();
	}

	@Override
	public ListaResponse getListaById(Integer id) {
		try {
			Optional<Lista> lista = listaService.findById(id);
			if (lista.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontró la lista con id: " + id);
			}
			return ListaMapper.toResponse(lista.get());
		} catch (Exception e) {
			logger.error("Error al obtener la lista con id: " + id, e);
			return null;
		}
	}

	@Override
	public ListaResponse getListaByCodigo(String codigo) {
		try {
			Lista lista = listaService.findByCodigo(codigo);
			if (Objects.isNull(lista)) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontró la lista con código: " + codigo);
			}
			return ListaMapper.toResponse(lista);
		} catch (Exception e) {
			logger.error("Error al obtener la lista con código: " + codigo, e);
			return null;
		}
	}
}