import ComponentManager from "../componentsManager.js";
import MusiqueService from "../services/MusiqueService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

try {
    const music = await MusiqueService.getMusicById(id);
    document.getElementById('main').appendChild(HTMLUtils.autoGenerateComponentForEntity(music, 'music'));
} catch (e) {
    document.getElementById('error').textContent = e
}



ComponentManager.drawNavBar()
ComponentManager.drawFooter()