package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.TipoDiagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDiagnosticoDao  extends JpaRepository<TipoDiagnostico, Integer> {
}
