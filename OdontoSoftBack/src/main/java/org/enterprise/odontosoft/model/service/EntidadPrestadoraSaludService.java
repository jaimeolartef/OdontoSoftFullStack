package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;

import java.util.List;

public interface EntidadPrestadoraSaludService {

  List<EntidadPrestadoraSalud> getAllEntidadPrestadoraSalud();
  EntidadPrestadoraSalud saveEntidadPrestadoraSalud(EntidadPrestadoraSalud entidad);
  void deleteEntidadPrestadoraSalud(Integer id);
  EntidadPrestadoraSalud getEntidadPrestadoraSaludById(Integer id);
}