package org.enterprise.odontosoft.view;

import lombok.RequiredArgsConstructor;
import org.enterprise.odontosoft.controller.HabitsHistoryController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.enterprise.odontosoft.view.dto.response.HabitoResponse;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/habitshistory")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class HabitsHistoryView {

    private final HabitsHistoryController habitsHistory;

    @GetMapping("/getall")
    public ResponseEntity<ApiResponse<List<HabitoResponse>>> getHabitos() {
        List<HabitoResponse> response = habitsHistory.getHabitos();
        return ResponseEntity.ok(ApiResponse.success(response, "Hábitos obtenidos correctamente"));
    }
}