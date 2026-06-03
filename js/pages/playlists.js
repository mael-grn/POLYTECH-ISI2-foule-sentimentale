import ComponentManager from "../componentsManager.js";
import AlbumService from "../services/AlbumService.js";
import ArtisteService from "../services/ArtisteService.js";
import PlaylistService from "../services/PlaylistService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

try {
    const play = await PlaylistService.getPlaylistById(id);
    document.getElementById('main').appendChild(HTMLUtils.autoGenerateComponentForEntity(play, 'playlist'));
} catch (e) {
    document.getElementById('error').textContent = e
}



ComponentManager.drawNavBar()
ComponentManager.drawFooter()