package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.SedeEmpresaController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.SedeEmpresaRequest;
import org.enterprise.odontosoft.view.dto.response.SedeEmpresaResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/sedeempresa")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SedeEmpresaView {

    private final SedeEmpresaController sedeEmpresaController;

    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse<SedeEmpresaResponse>> guardarSedeEmpresa(@Valid @RequestBody SedeEmpresaRequest request) {
        SedeEmpresaResponse response = sedeEmpresaController.saveSedeEmpresaEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(response, "Sede empresa creada exitosamente"));
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ApiResponse<SedeEmpresaResponse>> consultarPorId(@PathVariable Integer id) {
        SedeEmpresaResponse response = sedeEmpresaController.getSedeEmpresaById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Sede empresa encontrada"));
    }

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<SedeEmpresaResponse>>> consultarTodas() {
        List<SedeEmpresaResponse> response = sedeEmpresaController.getAllSedeEmpresa();
        return ResponseEntity.ok(ApiResponse.success(response, "Listado de sedes empresa obtenido exitosamente"));
    }

    @GetMapping("/consultar/entidad/{idEntidad}")
    public ResponseEntity<ApiResponse<List<SedeEmpresaResponse>>> consultarPorEntidad(@PathVariable Integer idEntidad) {
        List<SedeEmpresaResponse> response = sedeEmpresaController.getSedeEmpresabyEntidad(idEntidad);
        return ResponseEntity.ok(ApiResponse.success(response, "Sedes de la entidad obtenidas exitosamente"));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse<SedeEmpresaResponse>> updateSedeEmpresa(@Valid @RequestBody SedeEmpresaRequest request) {
        SedeEmpresaResponse response = sedeEmpresaController.saveSedeEmpresaEntity(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Sede empresa actualizada exitosamente"));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarSedeEmpresa(@PathVariable Integer id) {
        sedeEmpresaController.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Sede empresa eliminada exitosamente"));
    }
}