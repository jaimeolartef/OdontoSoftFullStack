package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.Menu;

import java.util.List;

public interface MenuService {

  List<Menu> findByCodigoUsuario(String codigo);
}
