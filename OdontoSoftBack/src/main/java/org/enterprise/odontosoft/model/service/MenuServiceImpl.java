package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.dao.MenuDao;
import org.enterprise.odontosoft.model.entity.Menu;

import java.util.List;

public class MenuServiceImpl implements MenuService {

  private MenuDao menuDao;

  @Override
  public List<Menu> findByCodigoUsuario(String codigo) {
    return menuDao.findByCodigoUsuario(codigo);
  }
}
