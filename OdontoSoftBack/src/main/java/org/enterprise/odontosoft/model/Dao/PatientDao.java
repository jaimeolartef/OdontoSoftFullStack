package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Paciente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientDao  extends CrudRepository<Paciente, Long>  {

    @Query("SELECT p FROM Paciente p WHERE p.documento = :document and p.idtipodocumento.id = :documentType")
    Paciente findByDocumentAndTypeDocument(String document, Integer documentType);
}
