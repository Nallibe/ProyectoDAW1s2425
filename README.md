# **Memoria Mágica**

Juego de cartas de memoria que permite a los jugadores de todas las edades ejercitar su memoria mientras se divierten, se trata de un proyecto creado con el objetivo de trabajar destrezas muy importantes en el proceso de aprendizaje como la memoria, la atención, la concentración, el respeto, la tolerancia a la frustración, y la emoción, a través de un formato lúdico que utiliza objetos cotidianos como punto de referencia.
Este proyecto está desarrollado en lenguaje JavaScript, html, css.

---

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **[Docker](https://www.docker.com/)**: Para construir y ejecutar los contenedores.
- **[Docker Compose](https://docs.docker.com/compose/)**: Para orquestar los servicios del proyecto.

---

## **Estructura del proyecto**

```plaintext
/ProyectoDAW1s2425
|-- Dockerfile       
|-- package.json
|-- server.js
|-- index.js
|-- /public            
|   |-- Dockerfile     
|   |-- index.html
|   |-- style.css
|   |-- script.js
|-- init.sql            
|-- docker-compose.yml  
|-- README.md  
```
##**1. Clonar el repositorio**
Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Nallibe/ProyectoDAW1s2425.git
cd ProyectoDAW1s2425
```
##**2. Construir y ejecutar los contenedores**
Ejecuta el siguiente comando para construir las imágenes y arrancar los contenedores:
```bash
docker-compose up -d
```
Este comando construirá las imágenes para el frontend, backend y MySQL.
Iniciará los contenedores definidos en docker-compose.yml.

##**4. Verificar los servicios**

Frontend: Disponible en http://localhost:8080.
Backend: Disponible en http://localhost:3000.
MySQL: Disponible en localhost:3306

##**5. Detener los contenedores**
Para detener los contenedores, usa:
```bash
docker-compose down
```


