export default class HTMLUtils {
    static autoGenerateComponentForEntity(entity) {
        const div = document.createElement('div');
        for (const [cle, valeur] of Object.entries(entity)) {

            // 1. CAS DU TABLEAU
            if (Array.isArray(valeur)) {
                const sectionListe = document.createElement('div');
                sectionListe.classList.add(`liste-${cle}`);
                valeur.forEach((element, index) => {
                    const composantEnfant = this.autoGenerateComponentForEntity({ [`${cle}`]: element });
                    sectionListe.appendChild(composantEnfant);
                });

                div.appendChild(sectionListe);
            }

            // 2. CAS DE L'OBJET
            else if (typeof valeur === 'object' && valeur !== null) {
                const composant = this.autoGenerateLinkForEntity(valeur, cle, '/'+cle+'?id='+valeur.id);
                composant.classList.add(`conteneur-${cle}`);
                div.appendChild(composant);
            }

            // 3. CAS DE BASE
            else {
                const span = document.createElement('span');
                span.textContent = valeur;
                span.dataset.label = cle;
                span.classList.add(`propriete-${cle}`);

                div.appendChild(span);
            }
        }

        return div;
    }
    
    static autoGenerateLinkForEntity(entity, name, href) {
        const a = document.createElement('a');
        a.href = href
        for (const [cle, valeur] of Object.entries(entity)) {
            const elem = document.createElement(cle);
            elem.textContent = valeur
            elem.className = name
            a.appendChild(elem)
        }
        return a
    }
}