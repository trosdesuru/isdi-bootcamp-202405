import fs from 'fs';

function findPosts(condition) {
    let posts;

    try {
        // Lee el contenido del archivo 'data/posts.json' de manera sincrónica
        const data = fs.readFileSync('data/posts.json', 'utf8');

        // Intenta parsear el contenido del archivo como JSON
        posts = JSON.parse(data);
    } catch (err) {
        // Maneja los errores de lectura del archivo o de parsing
        console.error('Error reading or parsing file:', err);
        posts = [];
    }

    // Filtra los posts según la condición proporcionada
    const foundPosts = posts.filter(condition);

    // Devuelve los posts encontrados
    return foundPosts;
}

export default findPosts;
