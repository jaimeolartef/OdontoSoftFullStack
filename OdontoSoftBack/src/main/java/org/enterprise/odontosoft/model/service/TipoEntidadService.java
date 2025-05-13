package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.TipoEntidad;

import java.util.List;

public interface TipoEntidadService {

  List<TipoEntidad> getAllTipoEntidad();
  TipoEntidad saveTipoEntidad(TipoEntidad tipoEntidad);
  void deleteTipoEntidad(Integer id);
  TipoEntidad getTipoEntidadById(Integer id);
}
