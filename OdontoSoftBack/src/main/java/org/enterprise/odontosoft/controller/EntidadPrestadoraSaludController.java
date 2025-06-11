package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.enterprise.odontosoft.view.dto.response.EntidadPrestadoraSaludResponse;

import java.util.List;

public interface EntidadPrestadoraSaludController {

    // Obtener todas las entidades prestadoras de salud
    List<EntidadPrestadoraSaludResponse> getAllEntidadesPrestadorasSalud();

    // Obtener una entidad prestadora de salud por ID
    EntidadPrestadoraSaludResponse getEntidadPrestadoraSaludById(Integer id);

    // Guardar una nueva entidad prestadora de salud
    EntidadPrestadoraSaludResponse saveEntidadPrestadoraSalud(EntidadPrestadoraSaludRequest entidad);

    // Eliminar una entidad prestadora de salud por ID
    void deleteEntidadPrestadoraSalud(Integer id);

    List<EntidadPrestadoraSaludResponse> buscarEntidadesPorNombreODocumento(String numerodocumento, String nombre);
}