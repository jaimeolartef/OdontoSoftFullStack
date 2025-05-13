package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.Regimen;
import org.springframework.data.repository.CrudRepository;

public interface RegimenDao extends CrudRepository<Regimen, Integer> {
}