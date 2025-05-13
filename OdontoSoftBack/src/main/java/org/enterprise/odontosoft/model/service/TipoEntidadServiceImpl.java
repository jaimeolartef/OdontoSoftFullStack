package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.TipoEntidadDao;
import org.enterprise.odontosoft.model.entity.TipoEntidad;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TipoEntidadServiceImpl implements TipoEntidadService {

  private final TipoEntidadDao tipoEntidadDao;

  @Override
  public List<TipoEntidad> getAllTipoEntidad() {
    return (List<TipoEntidad>) tipoEntidadDao.findAll();
  }

  @Override
  public TipoEntidad saveTipoEntidad(TipoEntidad tipoEntidad) {
    return tipoEntidadDao.save(tipoEntidad);
  }

  @Override
  public void deleteTipoEntidad(Integer id) {
    tipoEntidadDao.deleteById(id);
  }

  @Override
  public TipoEntidad getTipoEntidadById(Integer id) {
    return tipoEntidadDao.findById(id).orElse(null);
  }
}