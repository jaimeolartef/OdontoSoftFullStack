package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.enterprise.odontosoft.view.dto.response.EntidadPrestadoraSaludResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EntidadPrestadoraSaludController {

    // Obtener todas las entidades prestadoras de salud
    ResponseEntity<List<EntidadPrestadoraSaludResponse>> getAllEntidadesPrestadorasSalud();

    // Obtener una entidad prestadora de salud por ID
    ResponseEntity<EntidadPrestadoraSaludResponse> getEntidadPrestadoraSaludById(Integer id);

    // Guardar una nueva entidad prestadora de salud
    ResponseEntity<EntidadPrestadoraSaludResponse> saveEntidadPrestadoraSalud(EntidadPrestadoraSaludRequest entidad);

    // Eliminar una entidad prestadora de salud por ID
    ResponseEntity<Void> deleteEntidadPrestadoraSalud(Integer id);

    ResponseEntity<List<EntidadPrestadoraSaludResponse>> buscarEntidadesPorNombreODocumento(String numerodocumento, String nombre);
}