package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.EntidadPrestadoraSaludDao;
import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EntidadPrestadoraSaludServiceImpl implements EntidadPrestadoraSaludService {

  private final EntidadPrestadoraSaludDao entidadPrestadoraSaludDao;

  @Override
  public List<EntidadPrestadoraSalud> getAllEntidadPrestadoraSalud() {
    return (List<EntidadPrestadoraSalud>) entidadPrestadoraSaludDao.findAll();
  }

  @Override
  public EntidadPrestadoraSalud saveEntidadPrestadoraSalud(EntidadPrestadoraSalud entidad) {
    return entidadPrestadoraSaludDao.save(entidad);
  }

  @Override
  public void deleteEntidadPrestadoraSalud(Integer id) {
    entidadPrestadoraSaludDao.deleteById(id);
  }

  @Override
  public EntidadPrestadoraSalud getEntidadPrestadoraSaludById(Integer id) {
    return entidadPrestadoraSaludDao.findById(id).orElse(null);
  }

  @Override
  public List<EntidadPrestadoraSalud> buscarPorNombreODocumento(String numerodocumento, String nombre) {
      Integer numDoc = null;
      if (numerodocumento != null && !numerodocumento.isEmpty()) {
          try {
              numDoc = Integer.valueOf(numerodocumento);
          } catch (NumberFormatException e) {
              // Si no es un número válido, se mantendrá como null
          }
      }

      return entidadPrestadoraSaludDao.buscarPorNombreODocumento(numDoc, nombre);
  }
}