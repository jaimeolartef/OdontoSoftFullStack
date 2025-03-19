package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Entity.ConstanteSistema;
import org.enterprise.odontosoft.view.dto.response.ConstanteResponse;

import java.util.List;


public interface ConstantsService {

	List<ConstanteSistema> getAllConstants();
}
