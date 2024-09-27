package org.enterprise.odontosoft.view;

import lombok.RequiredArgsConstructor;
import org.enterprise.odontosoft.controller.HabitsHistoryController;
import org.enterprise.odontosoft.view.dto.MensajeValidation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/habitshistory")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class HabitsHistoryView {

	private final HabitsHistoryController habitsHistory;

	@GetMapping("/getall")
	public ResponseEntity getHabitos() {
		try {
			return ResponseEntity.ok(habitsHistory.getHabitos());
		} catch (NoSuchElementException e) {
			return ResponseEntity.badRequest().body(MensajeValidation.builder().codigoValidacion(e.getCause().toString()).mensajeValidacion(e.getMessage()).build());
		}
	}
}
