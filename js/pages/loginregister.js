import UserService from "../services/UserService.js"
import ComponentManager from "../componentsManager.js"

const onLogin = async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('mot_de_passe').value
    try {
        await UserService.login(email, password)
        window.location = "/"
    } catch (e) {
        document.getElementById('error').textContent = e
    }
}

const onRegister = async (e) => {
    e.preventDefault()
    const nom = document.getElementById('nom').value
    const email = document.getElementById('email').value
    const password = document.getElementById('mot_de_passe').value
    try {
        await UserService.register(nom, email, password)
        window.location = "/"
    } catch (e) {
        document.getElementById('error').textContent = e
    }
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').onsubmit = onLogin;
}
if (document.getElementById('register-form')) {
    document.getElementById('register-form').onsubmit = onRegister;
}

ComponentManager.drawNavBar()
ComponentManager.drawFooter()