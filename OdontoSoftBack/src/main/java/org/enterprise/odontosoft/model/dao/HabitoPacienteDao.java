package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.HabitoPaciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitoPacienteDao extends JpaRepository<HabitoPaciente, Long> {
}
