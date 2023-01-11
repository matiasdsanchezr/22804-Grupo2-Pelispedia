import placeholderImagen from '../placeholder-image.jpg';

// Obtiene flyer de la película dada una dirección
export function obtenerPosterPelicula(path, width) {
  return path
    ? `https://image.tmdb.org/t/p/w${width}${path}`
    : placeholderImagen;
}
// Obtiene el fondo de pantalla de la película dada una dirección
export function obtenerBackdropPelicula(path, width) {
  return path
    ? `https://image.tmdb.org/t/p/w${width}${path}`
    : placeholderImagen;
}
