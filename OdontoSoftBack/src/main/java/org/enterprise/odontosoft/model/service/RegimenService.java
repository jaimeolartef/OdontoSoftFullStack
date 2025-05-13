package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.Regimen;

import java.util.List;

public interface RegimenService {

  List<Regimen> getAllRegimen();
  Regimen saveRegimen(Regimen regimen);
  void deleteRegimen(Integer id);
  Regimen getRegimenById(Integer id);
}