import ComponentManager from "../componentsManager.js";
import ArtisteService from "../services/ArtisteService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

try {
    const artist = await ArtisteService.getArtistById(id);
    document.getElementById('main').appendChild(HTMLUtils.autoGenerateComponentForEntity(artist, 'artiste'));
} catch (e) {
    document.getElementById('error').textContent = e
}



ComponentManager.drawNavBar()
ComponentManager.drawFooter()