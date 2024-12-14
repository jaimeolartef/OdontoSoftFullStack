package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario, Integer> {

  @Query(value = "select u from Usuario u where u.codigo = ?1 and u.habilitado = true")
  public Usuario findByCodigo(String codigo);

  @Query(value = "select u from Usuario u where u.correo = :email")
  public Usuario findByEmail(String email);
}

