package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.FormulaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulaMedicaDao extends JpaRepository<FormulaMedica, Long> {
}
