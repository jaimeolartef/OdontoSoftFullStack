package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Paciente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientDao  extends CrudRepository<Paciente, Long>  {
}
