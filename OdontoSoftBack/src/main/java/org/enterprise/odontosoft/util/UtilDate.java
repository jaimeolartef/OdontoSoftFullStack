package org.enterprise.odontosoft.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

public class UtilDate {

    public static LocalDate convertToLocalDate(String dateToConvert) {
        String dateTimeString = "2024-08-13T01:47:26.503Z";
        Instant instant = Instant.parse(dateTimeString);
        return instant.atZone(ZoneId.systemDefault()).toLocalDate();
    }
}
