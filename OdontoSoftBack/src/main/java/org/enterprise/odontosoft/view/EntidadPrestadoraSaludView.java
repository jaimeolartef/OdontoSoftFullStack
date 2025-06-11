package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.EntidadPrestadoraSaludController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.enterprise.odontosoft.view.dto.response.EntidadPrestadoraSaludResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/eps")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EntidadPrestadoraSaludView {

    private final EntidadPrestadoraSaludController entidadPrestadoraSaludController;

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<EntidadPrestadoraSaludResponse>>> getEntidadesPrestadorasSalud(
        @RequestParam(required = false) String numerodocumento,
        @RequestParam(required = false) String nombre) {
        List<EntidadPrestadoraSaludResponse> response;
        if ((numerodocumento != null && !numerodocumento.isEmpty()) ||
            (nombre != null && !nombre.isEmpty())) {
            response = entidadPrestadoraSaludController.buscarEntidadesPorNombreODocumento(numerodocumento, nombre);
            return ResponseEntity.ok(ApiResponse.success(response, "Entidades encontradas correctamente"));
        }
        response = entidadPrestadoraSaludController.getAllEntidadesPrestadorasSalud();
        return ResponseEntity.ok(ApiResponse.success(response, "Entidades obtenidas correctamente"));
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ApiResponse<EntidadPrestadoraSaludResponse>> getEntidadPrestadoraSaludById(@PathVariable Integer id) {
        EntidadPrestadoraSaludResponse response = entidadPrestadoraSaludController.getEntidadPrestadoraSaludById(id);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Entidad no encontrada"));
        }
        return ResponseEntity.ok(ApiResponse.success(response, "Entidad obtenida correctamente"));
    }

    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse<EntidadPrestadoraSaludResponse>> saveEntidadPrestadoraSalud(@RequestBody EntidadPrestadoraSaludRequest entidad) {
        EntidadPrestadoraSaludResponse response = entidadPrestadoraSaludController.saveEntidadPrestadoraSalud(entidad);
        return ResponseEntity.ok(ApiResponse.success(response, "Entidad guardada correctamente"));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEntidadPrestadoraSalud(@PathVariable Integer id) {
        entidadPrestadoraSaludController.deleteEntidadPrestadoraSalud(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Entidad eliminada correctamente"));
    }
}