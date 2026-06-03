import ComponentManager from "../componentsManager.js";
import ArtisteService from "../services/ArtisteService.js";
import GenreService from "../services/GenreService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

try {
    const genre = await GenreService.getGenreById(id);
    document.getElementById('main').appendChild(HTMLUtils.autoGenerateComponentForEntity(genre, 'genre'));
} catch (e) {
    document.getElementById('error').textContent = e
}



ComponentManager.drawNavBar()
ComponentManager.drawFooter()