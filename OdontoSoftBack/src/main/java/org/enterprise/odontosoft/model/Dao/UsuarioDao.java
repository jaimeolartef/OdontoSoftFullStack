package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario, Long> {

  @Query(value = "select u from Usuario u where u.codigo = ?1")
  public Usuario findByCodigo(String Codigo);
}

