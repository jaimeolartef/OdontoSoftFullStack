FROM openjdk:17
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
ENTRYPOINT ["java", "-jar", "target/OdontoSoft-1.0.0-SNAPSHOT.jar"]