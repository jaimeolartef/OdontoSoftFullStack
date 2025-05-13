package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.Antecedente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AntecedenteDao extends JpaRepository<Antecedente, Integer> {

    List<Antecedente> findAllByHabilitadoTrue();
}
