import UserService from "./services/UserService.js"


export default class ComponentManager {
  static async drawNavBar(parent = "body") {
    let header = document.createElement("header");
    header.innerHTML = await this.get('navbar');
    let firstChild = document.querySelector("body").firstChild
    document
      .querySelector(parent)
      .insertBefore(header, firstChild);

    const usernameEl = document.getElementById('username');
    const connexionBtn = document.getElementById('connexion-btn');

    if (!usernameEl || !connexionBtn) return;

    try {
      const user = await UserService.getMyAccount();
      usernameEl.textContent = user.nom;
      connexionBtn.textContent = "Déconnexion";
      connexionBtn.onclick = () => {
        localStorage.removeItem('token');
        window.location.reload();
      };
    } catch (e) {
      usernameEl.textContent = "";
      connexionBtn.textContent = "Connexion";
      connexionBtn.href = "/auth/login";
    }
  }

  static async drawFooter(parent = "body") {
    let footer = document.createElement("footer");
    footer.innerHTML = await this.get('footer');
    document.querySelector(parent).appendChild(footer);
  }

  static async get(component) {
    try {
      const response = await fetch("/components/" + component + ".html");
      const data = await response.text();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}