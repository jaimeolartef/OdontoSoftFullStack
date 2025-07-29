package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.ListaController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.ListaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/lista")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class ListaView {

    private final ListaController listaController;

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<ListaResponse>>> getAllListas() {
        List<ListaResponse> response = listaController.getAllListas();
        return ResponseEntity.ok(ApiResponse.success(response, "Listado de listas obtenido exitosamente"));
    }

    @GetMapping("/consultar/activas")
    public ResponseEntity<ApiResponse<List<ListaResponse>>> getAllActiveListas() {
        List<ListaResponse> response = listaController.getAllActiveListas();
        return ResponseEntity.ok(ApiResponse.success(response, "Listado de listas activas obtenido exitosamente"));
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ApiResponse<ListaResponse>> getListaById(@PathVariable Integer id) {
        ListaResponse response = listaController.getListaById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Lista obtenida exitosamente"));
    }

    @GetMapping("/consultar/codigo/{codigo}")
    public ResponseEntity<ApiResponse<ListaResponse>> getListaByCodigo(@PathVariable String codigo) {
        ListaResponse response = listaController.getListaByCodigo(codigo);
        return ResponseEntity.ok(ApiResponse.success(response, "Lista obtenida exitosamente"));
    }
}
