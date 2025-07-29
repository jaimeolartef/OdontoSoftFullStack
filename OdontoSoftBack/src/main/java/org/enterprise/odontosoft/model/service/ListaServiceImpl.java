package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.ListaDao;
import org.enterprise.odontosoft.model.entity.Lista;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ListaServiceImpl implements ListaService {

    private final ListaDao listaDao;

    @Override
    public List<Lista> findAll() {
        return (List<Lista>) listaDao.findAll();
    }

    @Override
    public Optional<Lista> findById(Integer id) {
        return listaDao.findById(id);
    }

    @Override
    public Lista save(Lista lista) {
        return listaDao.save(lista);
    }

    @Override
    public void deleteById(Integer id) {
        listaDao.deleteById(id);
    }

    @Override
    public List<Lista> findAllActive() {
        return listaDao.findAllByHabilitadoTrue();
    }

    @Override
    public Lista findByCodigo(String codigo) {
        return listaDao.findByCodigoAndHabilitadoTrue(codigo);
    }
}
