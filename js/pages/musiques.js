import ComponentManager from "../componentsManager.js";
import MusiqueService from "../services/MusiqueService.js";
import PlaylistService from "../services/PlaylistService.js";
import UserService from "../services/UserService.js";
import HTMLUtils from "../utils/HTMLUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

try {
    const music = await MusiqueService.getMusicById(id);
    document.getElementById('main').appendChild(HTMLUtils.autoGenerateComponentForEntity(music, 'music'));

    const user = await UserService.getMyAccount();
    if (user.musiques.find((m) => m.id == music.id)) {
        if (music.prix > 0) {
            const p = document.createElement('p')
            p.textContent = "Vous possédez cette musique."
            document.getElementById('main').appendChild(p)
        }
    } else {
        if (music.prix > 0) {
            const btn = document.createElement('button')
            btn.textContent = "Acheter (" + music.prix + "€)"
            btn.onclick = () => {
                MusiqueService.buyMusic(music.id).then(() => {
                    window.location.reload();
                })
            }
            document.getElementById('main').appendChild(btn)
        } else {
            const p = document.createElement('p')
            p.textContent = "Cette musique est gratuite"
            document.getElementById('main').appendChild(p)
        }
    }
    if (user.musiques.find((m) => m.id == music.id) || music.prix == 0) {
        const playlists = await PlaylistService.getMine()
        if (playlists.length > 0) {
            const h = document.createElement('h3')
            h.textContent = "Vos playlists"
            document.getElementById('playlists').appendChild(h)
        }

        for (const playlist of playlists) {
            if (playlist.musiques.find((m) => m.id == music.id)) {
                const b = document.createElement('button')
                b.textContent = "Supprimer de \"" + playlist.nom + "\""
                b.onclick = () => {
                    PlaylistService.removeSongToPlaylist(playlist.id, music).then(() => {
                        window.location.reload()
                    })
                }
                document.getElementById('playlists').appendChild(b)
            } else {
                const b = document.createElement('button')
                b.textContent = "Ajouter à \"" + playlist.nom + "\""
                b.onclick = () => {
                    PlaylistService.addSongToPlaylist(playlist.id, music).then(() => {
                        window.location.reload()
                    })
                }
                document.getElementById('playlists').appendChild(b)
            }

        }
    }

} catch (e) {
    document.getElementById('error').textContent = e
}



ComponentManager.drawNavBar()
ComponentManager.drawFooter()