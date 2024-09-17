package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.HabitoPaciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitoPacienteDao extends JpaRepository<HabitoPaciente, Long> {
}
