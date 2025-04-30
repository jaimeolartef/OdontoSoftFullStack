package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.AyudaDiagnosticaArchivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AyudaDiagnosticaArchivoDao extends JpaRepository<AyudaDiagnosticaArchivo, Integer> {
}
