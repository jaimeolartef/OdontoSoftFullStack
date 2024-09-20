package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Antecedente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AntecedenteDao extends JpaRepository<Antecedente, Integer> {

    List<Antecedente> findAllByHabilitadoTrue();
}
