package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.ConstanteSistemasDao;
import org.enterprise.odontosoft.model.entity.ConstanteSistema;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ConstantsServiceImpl implements ConstantsService {

	public final ConstanteSistemasDao constanteSistemasDao;

	@Override
	public List<ConstanteSistema> getAllConstants() {
		return constanteSistemasDao.findAll();
	}
}
