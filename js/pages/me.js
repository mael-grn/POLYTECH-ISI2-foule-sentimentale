import ComponentManager from "../componentsManager.js";
import PlaylistService from "../services/PlaylistService.js";
import UserService from "../services/UserService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

try {
    const me = await UserService.getMyAccount();
    document.getElementById('infos').appendChild(HTMLUtils.autoGenerateComponentForEntity({ nom: me.nom, email: me.email, created_at: me.created_at, updated_at: me.updated_at }, 'me'));
    if (me.musiques && me.musiques.length > 0) {
        document.getElementById('musics').appendChild(HTMLUtils.autoGenerateComponentForEntity(me.musiques, 'me'));
    } else {
        let elem = document.createElement('p')
        elem.textContent = "Vous n'avez encore acheté aucune musique"
        document.getElementById('musics').appendChild(elem)
    }
    if (me.playlists && me.playlists.length > 0) {
        for (const playlist of me.playlists) {
            document.getElementById('playlists').appendChild(HTMLUtils.autoGenerateComponentForEntity(playlist, 'playlist', '/playlists?id=' + playlist.id));
        }
    } else {
        let elem = document.createElement('p')
        elem.textContent = "Vous n'avez encore créé aucune playliste"
        document.getElementById('playlists').appendChild(elem)
    }
    document.getElementById('new-playlist').onsubmit = (e) => {
        e.preventDefault()
        const nom = document.getElementById('new-play-name').value
        PlaylistService.createPlaylist(nom, me.id).then(() => {
            window.location.reload();
        })
    }

} catch (e) {
    document.getElementById('error').textContent = e
}

ComponentManager.drawNavBar()
ComponentManager.drawFooter()