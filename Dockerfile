# Definir la imagen base
FROM python:3.10-slim

# Configurar el entorno de trabajo
WORKDIR /app

# Instalar dependencias y curl para descargar poetry
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    libc-dev \
    make \
    libheif-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV POETRY_VERSION=1.8.3

# Instalar Poetry utilizando pip sin cache
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

# Asegurarse de que el binario de Poetry esté en el PATH
ENV PATH="/root/.poetry/bin:${PATH}"

# Configurar Poetry: no crear un entorno virtual y no preguntar en la instalación
RUN poetry config virtualenvs.create false && \
    poetry config installer.parallel false

# Copiar solo archivos necesarios para la instalación de dependencias
COPY pyproject.toml poetry.lock* /app/

# Instalar dependencias de proyecto utilizando Poetry
RUN poetry install --no-dev --no-interaction --no-ansi

# Instalar gunicorn soportado por Flask
RUN poetry add gunicorn
# Instalar pyheif para manejar archivos HEIC
RUN poetry add pyheif

# Copiar el resto del código fuente al contenedor
COPY . /app

# Exponer el puerto en el que uvicorn estará escuchando
EXPOSE 6969

# Comando para ejecutar el servidor en modo producción
CMD ["gunicorn", "-b", "0.0.0.0:6969", "src.formatsnap.main:app", "--workers", "4", "--timeout", "120"]
