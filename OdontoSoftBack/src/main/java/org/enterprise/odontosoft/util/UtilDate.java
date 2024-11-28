package org.enterprise.odontosoft.util;

import lombok.experimental.UtilityClass;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@UtilityClass
public class UtilDate {

    public static LocalDate convertToLocalDate(String dateToConvert) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(dateToConvert, formatter);
    }

    public static LocalTime convertToLocalTime(String hourToConvert) {
        return LocalTime.parse(hourToConvert);
    }
}
