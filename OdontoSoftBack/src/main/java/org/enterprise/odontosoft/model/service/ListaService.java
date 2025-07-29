package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.Lista;

import java.util.List;
import java.util.Optional;

public interface ListaService {
    // Operaciones CRUD básicas
    List<Lista> findAll();
    Optional<Lista> findById(Integer id);
    Lista save(Lista lista);
    void deleteById(Integer id);

    // Operaciones específicas
    List<Lista> findAllActive();
    Lista findByCodigo(String codigo);
}
