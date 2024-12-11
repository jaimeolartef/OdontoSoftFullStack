# Para subir el proyecto en ambiente local

## Requisitos previos proyecto back-end

* Clonar el repositorio en tu maquina local desde el repositorio https://github.com/jaimeolartef/OdontoSoftFullStack.git

* Para crear el contenedor en docker de la BD, creamos el volumen primero con el siguiente comando `docker volume create odontosoft`

* Luego, creamos el contenedor con el siguiente comando `docker run -d --name PostgresOdontoSoft -e POSTGRES_PASSWORD=qwerty -v odontosoft:/var/lib/postgresql/data -p 5433:5432 postgres`

* Configurar el proyecto para utilizar el JDK 17


* La pantalla de asignación de citas, si no tengo el permiso de consultar significa que soy paciente y no puedo ver las citas de otros pacientes, solo las mias.