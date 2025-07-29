package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.Lista;
import org.enterprise.odontosoft.model.entity.ListaDetalle;

import java.util.List;
import java.util.Optional;

public interface ListaDetalleService {
    // Operaciones CRUD básicas
    List<ListaDetalle> findAll();
    Optional<ListaDetalle> findById(Integer id);
    ListaDetalle save(ListaDetalle listaDetalle);
    void deleteById(Integer id);

    // Operaciones específicas
    List<ListaDetalle> findAllActive();
    List<ListaDetalle> findActiveByLista(Lista lista);
    List<ListaDetalle> findByListaId(Integer idLista);
    List<ListaDetalle> findActiveByListaId(Integer idLista);
    ListaDetalle findByCodigo(String codigo);
}
