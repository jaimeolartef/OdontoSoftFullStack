package org.enterprise.odontosoft.model.Service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.Dao.ConstanteSistemasDao;
import org.enterprise.odontosoft.model.Entity.ConstanteSistema;
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
