package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.ConstantsController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.ConstanteResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/constants")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class ConstantsView {

	private final ConstantsController constantsController;

	public ConstantsView(ConstantsController constantsController) {
		this.constantsController = constantsController;
	}

	@GetMapping()
	public ResponseEntity<ApiResponse<List<ConstanteResponse>>> findConstant() {
		List<ConstanteResponse> response = constantsController.getAllConstants();
		return ResponseEntity.ok(ApiResponse.success(response, "Constantes obtenidas correctamente"));
	}
}