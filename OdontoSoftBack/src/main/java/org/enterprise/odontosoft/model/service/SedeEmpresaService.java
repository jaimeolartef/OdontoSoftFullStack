package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.SedeEmpresa;

import java.util.List;

public interface SedeEmpresaService {

  List<SedeEmpresa> getAllSedeEmpresa();
  SedeEmpresa saveSedeEmpresa(SedeEmpresa sede);
  void deleteSedeEmpresa(Integer id);
  SedeEmpresa getSedeEmpresaById(Integer id);
}