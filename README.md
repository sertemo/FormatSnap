# FormatSnap
### v0.2.0

![Tests](https://github.com/sertemo/FormatSnap/actions/workflows/tests.yml/badge.svg)
![Dependabot](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)
![GitHub](https://img.shields.io/github/license/sertemo/FormatSnap)
![Docker](https://img.shields.io/docker/image-size/sertemo/dogimobot?color=blue&logo=docker)

## Descripción
Pequeña web app para convertir imágenes de un formato a otro. Se usa la librería **Pillow** de Python para realizar dicha conversión.

La aplicación se conteneriza dentro de un **Docker** que se almacenará en mi servidor personal.

## Uso
Para usar la aplicación hay que navegar a `http://trymlmodels.com:6969` y arrastrar una imagen o pinchar sobre el enlace **'selecciona una'**.

![alt text](<assets/img/preview formatsnap.JPG>)

Selecciona el formato deseado y pincha en el botón **Convertir**. Se descargará una imagen con el mismo nombre que la imagen original pero en el formato especificado.

## SemVer
- 0.1.0 : Versión inicial
- 0.2.0 : Se cambia ligeramente el estilo. Se agrega el título en el body. Se agrega validación para el arrastre de archivos. Se agrega funcionalidad para convertir imágenes animadas webp o gif y conservar la animación. Se convierte la imagen a RGB si el formato de salida es JPEG para evitar excepción.

## Tests
![Pytest](https://img.shields.io/badge/testing-pytest-blue.svg)
![Black](https://img.shields.io/badge/code%20style-black-blue.svg)
![Flake8](https://img.shields.io/badge/linter-flake8-blue.svg)
![MyPy](https://img.shields.io/badge/type%20checker-mypy-blue.svg)

## Tecnologías
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Poetry](https://img.shields.io/badge/Poetry-60A5FA?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Pillow](https://img.shields.io/badge/pillow-%2338354C.svg?style=for-the-badge&logo=pillow&logoColor=white)

## Licencia
Copyright 2024 Sergio Tejedor Moreno

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

