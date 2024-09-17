package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.AyudaDiagnostica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AyudaDiagnosticaDao extends JpaRepository<AyudaDiagnostica, Long> {
}
