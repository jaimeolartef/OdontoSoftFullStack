package org.enterprise.odontosoft.view.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
	private boolean success;
	private String message;
	private T data;
	private long timestamp;

	public static <T> ApiResponse<T> success(T data, String message) {
		return ApiResponse.<T>builder()
			.success(true)
			.message(message)
			.data(data)
			.timestamp(System.currentTimeMillis())
			.build();
	}

	public static <T> ApiResponse<T> success(T data) {
		return success(data, "Operación exitosa");
	}

	public static <T> ApiResponse<T> error(String message) {
		return ApiResponse.<T>builder()
			.success(false)
			.message(message)
			.timestamp(System.currentTimeMillis())
			.build();
	}
}