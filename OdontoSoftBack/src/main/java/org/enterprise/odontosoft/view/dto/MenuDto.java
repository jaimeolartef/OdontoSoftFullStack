package org.enterprise.odontosoft.view.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuDto {
  private String nombreMenuPadre;
    private String nombreMenu;
    private String url;

}
