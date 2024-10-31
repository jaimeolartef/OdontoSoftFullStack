package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.TipoDiagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDiagnosticoDao  extends JpaRepository<TipoDiagnostico, Integer> {
}
