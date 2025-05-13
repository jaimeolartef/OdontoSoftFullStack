package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.RegimenDao;
import org.enterprise.odontosoft.model.entity.Regimen;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RegimenServiceImpl implements RegimenService {

  private final RegimenDao regimenDao;

  @Override
  public List<Regimen> getAllRegimen() {
    return (List<Regimen>) regimenDao.findAll();
  }

  @Override
  public Regimen saveRegimen(Regimen regimen) {
    return regimenDao.save(regimen);
  }

  @Override
  public void deleteRegimen(Integer id) {
    regimenDao.deleteById(id);
  }

  @Override
  public Regimen getRegimenById(Integer id) {
    return regimenDao.findById(id).orElse(null);
  }
}