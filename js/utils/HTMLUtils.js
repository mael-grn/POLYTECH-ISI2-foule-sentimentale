export default class HTMLUtils {
    /**
     * Initialise la navbar pour ajouter la classe 'active' sur le lien de la page courante.
     * Gère correctement les slashes de fin (ex: /explorer/ vs /explorer)
     */
    static initNavbar() {
        // Récupère le chemin actuel et retire le slash de fin s'il existe (sauf pour "/")
        const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Nettoie aussi le href du lien pour la comparaison
            const linkPath = link.getAttribute('href').replace(/\/$/, '') || '/';
            
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Génère un composant HTML complet et propre pour une entité donnée.
     */
    static autoGenerateComponentForEntity(entity, entityName = 'item') {
        const container = document.createElement('div');
        container.classList.add('entity-card', `card-${entityName}`);
        container.dataset.entityType = entityName;

        const propertiesContainer = document.createElement('div');
        propertiesContainer.classList.add('entity-properties');

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('entity-actions');

        for (const [cle, valeur] of Object.entries(entity)) {
            if (Array.isArray(valeur)) {
                const sectionListe = document.createElement('div');
                sectionListe.classList.add(`entity-list`, `list-${cle}`);
                
                valeur.forEach((element) => {
                    const composantEnfant = this.autoGenerateComponentForEntity(element, cle);
                    sectionListe.appendChild(composantEnfant);
                });

                actionsContainer.appendChild(sectionListe);
            }
            else if (typeof valeur === 'object' && valeur !== null) {
                const composantEnfant = this.autoGenerateComponentForEntity(valeur, cle);
                
                if (valeur.id !== undefined) {
                    const actionLink = document.createElement('a');
                    actionLink.href = `/${cle}?id=${valeur.id}`;
                    actionLink.classList.add('action-link', `link-${cle}`);
                    
                    actionLink.appendChild(composantEnfant);
                    actionsContainer.appendChild(actionLink);
                } else {
                    actionsContainer.appendChild(composantEnfant);
                }
            }
            else {
                const span = document.createElement('span');
                span.textContent = valeur;
                span.dataset.label = cle;
                span.classList.add('entity-property', `propriete-${cle}`);

                propertiesContainer.appendChild(span);
            }
        }

        if (entity.id !== undefined && entityName !== 'item') {
            const mainLink = document.createElement('a');
            mainLink.href = entityName.endsWith('s') ? `/${entityName}?id=${entity.id}` : `/${entityName}s?id=${entity.id}`;
            mainLink.classList.add('main-entity-link');
            mainLink.innerText = "Détails";
            actionsContainer.insertBefore(mainLink, actionsContainer.firstChild);
        }

        container.appendChild(propertiesContainer);
        if (actionsContainer.children.length > 0) {
            container.appendChild(actionsContainer);
        }

        return container;
    }
}