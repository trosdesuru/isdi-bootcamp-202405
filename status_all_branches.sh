#!/bin/bash

# Obtener la lista de todas las ramas locales y remotas
branches=$(git branch -a --list '*')

# Iterar sobre cada rama y obtener el status
while IFS= read -r branch; do
    # Verificar si es una rama remota (comienza con "remotes/upstream/")
    if [[ $branch == remotes/upstream/* ]]; then
        # Obtener el nombre de la rama remota
        remote_branch=${branch#remotes/upstream/}

        # Mostrar el status de la rama remota
        echo "Status para la rama remota: $remote_branch"
        git status -s -b -- "$remote_branch"
    elif [[ $branch == remotes/origin/* ]]; then
        # Mostrar el status de la rama remota que comienza con "remotes/origin/"
        remote_branch=${branch#remotes/origin/}

        echo "Status para la rama remota: $remote_branch"
        git status -s -b -- "$remote_branch"
    elif [[ $branch == origin/* ]]; then
        # Mostrar el status de la rama local que comienza con "origin/"
        local_branch=${branch#origin/}

        echo "Status para la rama local: $local_branch"
        git status -s -b -- "$local_branch"
    else
        # Mostrar el status de otras ramas locales (README.md, scripts, etc.)
        echo "Status para la rama local: $branch"
        git status -s -b -- "$branch"
    fi

    # Espacio para separar los resultados de las ramas
    echo ""
done <<< "$branches"

# Informar al usuario que se ha completado
echo "Obtención de status de todas las ramas completada."

