package org.enterprise.odontosoft.model.Dao;

import java.util.List;

import org.enterprise.odontosoft.model.Entity.Paciente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientDao  extends CrudRepository<Paciente, Integer>  {

    @Query("SELECT p FROM Paciente p WHERE p.documento = :document")
    List<Paciente> findByDocument(String document);

    @Query("SELECT p FROM Paciente p WHERE LOWER(p.primernombre) LIKE LOWER(CONCAT('%', :nombre, '%')) OR LOWER(p.segundonombre) LIKE LOWER(CONCAT('%', :nombre, '%')) OR LOWER(p.primerapellido) LIKE LOWER(CONCAT('%', :nombre, '%')) OR LOWER(p.segundoapellido) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Paciente> findByName(String nombre);
}
