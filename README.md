# **Memoria Mágica**

Este proyecto es una aplicación que combina un frontend estático con un backend desarrollado en Node.js y una base de datos MySQL. Utiliza Docker para facilitar su despliegue y ejecución.

---

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **[Docker](https://www.docker.com/)**: Para construir y ejecutar los contenedores.
- **[Docker Compose](https://docs.docker.com/compose/)**: Para orquestar los servicios del proyecto.

---

## **Estructura del proyecto**

```plaintext
/project-root
|-- /backend             # Backend en Node.js (Express)
|   |-- Dockerfile       # Dockerfile del backend
|   |-- package.json
|   |-- server.js
|-- /frontend            # Frontend estático (HTML, CSS, JS)
|   |-- Dockerfile       # Dockerfile del frontend
|   |-- index.html
|   |-- styles.css
|   |-- app.js
|-- init.sql             # Script SQL para inicializar la base de datos
|-- docker-compose.yml   # Orquestación de los contenedores
|-- README.md            # Documentación del proyecto
```
##**1. Clonar el repositorio**
Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/memoria-magica.git
cd memoria-magica
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
MySQL: Disponible en localhost:3306 con las siguientes credenciales:

##**4. Detener los contenedores**
Para detener los contenedores, usa:
```bash
docker-compose down
```


