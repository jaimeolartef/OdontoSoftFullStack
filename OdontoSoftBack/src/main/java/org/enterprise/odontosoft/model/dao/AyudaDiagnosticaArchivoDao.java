package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.AyudaDiagnosticaArchivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AyudaDiagnosticaArchivoDao extends JpaRepository<AyudaDiagnosticaArchivo, Integer> {
}
