package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.EntidadPrestadoraSaludController;
import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/eps")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EntidadPrestadoraSaludView {

    private final EntidadPrestadoraSaludController entidadPrestadoraSaludController;

    @GetMapping("/consultar")
    public ResponseEntity getEntidadesPrestadorasSalud(
        @RequestParam(required = false) String numerodocumento,
        @RequestParam(required = false) String nombre) {
        if ((numerodocumento != null && !numerodocumento.isEmpty()) ||
            (nombre != null && !nombre.isEmpty())) {
            return entidadPrestadoraSaludController.buscarEntidadesPorNombreODocumento(numerodocumento, nombre);
        }
        return entidadPrestadoraSaludController.getAllEntidadesPrestadorasSalud();
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity getEntidadPrestadoraSaludById(@PathVariable Integer id) {
        return entidadPrestadoraSaludController.getEntidadPrestadoraSaludById(id);
    }

    @PostMapping("/guardar")
    public ResponseEntity saveEntidadPrestadoraSalud(@RequestBody EntidadPrestadoraSaludRequest entidad) {
        return entidadPrestadoraSaludController.saveEntidadPrestadoraSalud(entidad);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity deleteEntidadPrestadoraSalud(@PathVariable Integer id) {
        return entidadPrestadoraSaludController.deleteEntidadPrestadoraSalud(id);
    }
}