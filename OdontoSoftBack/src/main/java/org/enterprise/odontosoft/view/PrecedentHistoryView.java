package org.enterprise.odontosoft.view;

import lombok.RequiredArgsConstructor;
import org.enterprise.odontosoft.controller.PrecedentHistoryController;
import org.enterprise.odontosoft.view.dto.MensajeValidation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;


@RequiredArgsConstructor
@RestController
@RequestMapping("/precedenthistory")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class PrecedentHistoryView {

    private final PrecedentHistoryController precedentHistory;

    @GetMapping("/get")
    public ResponseEntity getAntecedentes() {
        try {
            return ResponseEntity.ok(precedentHistory.getAntecedentes());
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(MensajeValidation.builder().codigoValidacion(e.getCause().toString()).mensajeValidacion(e.getMessage()).build());
        }
    }
}
