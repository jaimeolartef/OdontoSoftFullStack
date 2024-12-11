package org.enterprise.odontosoft.view.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuDto {
    private String nombreMenu;
    private List<MenuDto> menuHijo;
    private String url;
    private boolean crear;
    private boolean consultar;
    private boolean editar;
    private boolean eliminar;
}
