package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.SedeEmpresaDao;
import org.enterprise.odontosoft.model.entity.SedeEmpresa;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SedeEmpresaServiceImpl implements SedeEmpresaService {

  private final SedeEmpresaDao sedeEmpresaDao;

  @Override
  public List<SedeEmpresa> getAllSedeEmpresa() {
    return (List<SedeEmpresa>) sedeEmpresaDao.findAll();
  }

  @Override
  public SedeEmpresa saveSedeEmpresa(SedeEmpresa sede) {
    return sedeEmpresaDao.save(sede);
  }

  @Override
  public void deleteSedeEmpresa(Integer id) {
    sedeEmpresaDao.deleteById(id);
  }

  @Override
  public SedeEmpresa getSedeEmpresaById(Integer id) {
    return sedeEmpresaDao.findById(id).orElse(null);
  }

  @Override
  public List<SedeEmpresa> getSedeEmpresaByEntidad(Integer idEntidad) {
    return sedeEmpresaDao.findByEntidadPrestadoraSaludId(idEntidad);
  }
}