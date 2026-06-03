
import ComponentManager from "../componentsManager.js";
import ArtisteService from "../services/ArtisteService.js";
import GenreService from "../services/GenreService.js";
import MusiqueService from "../services/MusiqueService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

const artistesConteneur = document.getElementById('artists-container');
const genreConteneur = document.getElementById('genre-container');
const musiqueConteneur = document.getElementById('music-container');
let artists = []
try {
    artists = await ArtisteService.getAllArtists();
} catch (e) {
    document.getElementById('artists-error').textContent = e
}
let genres = []
try {
    genres = await GenreService.getAllGenre();
} catch (e) {
    document.getElementById('genre-error').textContent = e
}
const free = await MusiqueService.getFreeMusics();

for (const artist of artists) {
    artistesConteneur.appendChild(HTMLUtils.autoGenerateLinkForEntity(artist, 'artiste', '/artistes?id=' + artist.id));
}

for (const genre of genres) {
    genreConteneur.appendChild(HTMLUtils.autoGenerateLinkForEntity(genre, 'genre', '/genres?id=' + genre.id));
}

for (const music of free) {
    musiqueConteneur.appendChild(HTMLUtils.autoGenerateLinkForEntity(music, 'music', 'musiques?id=' + music.id));
}

ComponentManager.drawNavBar()
ComponentManager.drawFooter()