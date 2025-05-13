package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.HabitoMapper;
import org.enterprise.odontosoft.model.dao.HabitoDao;
import org.enterprise.odontosoft.model.entity.Habito;
import org.enterprise.odontosoft.view.dto.response.HabitoResponse;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class HabitsHistoryControllerImpl implements HabitsHistoryController {

	private final HabitoDao habitoDao;

	@Override
	public List<HabitoResponse> getHabitos() {
		List<Habito> habitos = habitoDao.findAllByHabilitadoTrue();
		return habitos.stream().map(HabitoMapper::entityToDto).toList();
	}
}
