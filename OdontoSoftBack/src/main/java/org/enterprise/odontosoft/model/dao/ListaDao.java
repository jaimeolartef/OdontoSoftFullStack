package org.enterprise.odontosoft.model.dao;


import org.enterprise.odontosoft.model.entity.Lista;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListaDao extends CrudRepository<Lista, Integer> {

    List<Lista> findAllByHabilitadoTrue();

    Lista findByCodigoAndHabilitadoTrue(String codigo);

    Lista findByDescripcionAndHabilitadoTrue(String descripcion);
}
