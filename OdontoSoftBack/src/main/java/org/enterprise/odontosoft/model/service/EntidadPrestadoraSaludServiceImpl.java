package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.EntidadPrestadoraSaludDao;
import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EntidadPrestadoraSaludServiceImpl implements EntidadPrestadoraSaludService {

  private final EntidadPrestadoraSaludDao entidadPrestadoraSaludDao;

  @Override
  public List<EntidadPrestadoraSalud> getAllEntidadPrestadoraSalud() {
    return (List<EntidadPrestadoraSalud>) entidadPrestadoraSaludDao.findAll();
  }

  @Override
  public EntidadPrestadoraSalud saveEntidadPrestadoraSalud(EntidadPrestadoraSalud entidad) {
    return entidadPrestadoraSaludDao.save(entidad);
  }

  @Override
  public void deleteEntidadPrestadoraSalud(Integer id) {
    entidadPrestadoraSaludDao.deleteById(id);
  }

  @Override
  public EntidadPrestadoraSalud getEntidadPrestadoraSaludById(Integer id) {
    return entidadPrestadoraSaludDao.findById(id).orElse(null);
  }
}