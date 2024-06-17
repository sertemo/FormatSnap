"""Actualiza en el README la versión"""

import toml


def update_readme():
    # Leer la configuración del proyecto
    with open("pyproject.toml", "r") as file:
        data = toml.load(file)
        current_version = data["tool"]["poetry"]["version"]

    # Leer el contenido actual de README.md y actualizar si es necesario
    with open("README.md", "r") as file:
        readme_contents = file.readlines()

    new_readme_content = f"### v{current_version}\n"

    if readme_contents[1] != new_readme_content:
        # La versión está en la segunda fila
        readme_contents[1] = new_readme_content
        # Escribir el contenido actualizado de nuevo a README.md
        with open("README.md", "w") as file:
            file.writelines(readme_contents)
        print("README updated")
    else:
        print("No update needed")


if __name__ == "__main__":
    update_readme()
