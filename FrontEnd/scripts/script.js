/*** Definition de la fonction génératrice de la gallerie */
export function genererProjets(works) {
    document.querySelector(".gallery").innerHTML="";

    for (let i=0; i<works.length; i++) { 
        const projet = works[i];
        const galleryElement= document.querySelector(".gallery");
        const figureElement= document.createElement("figure");
        const imageElement= document.createElement("img");
        imageElement.src= projet.imageUrl;
        const figcaptionElement= document.createElement("figcaption");
        figcaptionElement.innerText= projet.title;
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        galleryElement.appendChild(figureElement);
    }
};


/*** Définition de la fonction générant le menu des catégories */
export function genererMenuCategories (works) {
    
    /*** Génération d'une array contenant les catégories sans doublons */
    const categoriesMap= works.map (works => works.category.name);
    const categoriesSet= new Set (categoriesMap);
    const categoriesArray = Array.from(categoriesSet);

    /*** Récupération des elements HTML necessaires */
    const menuElement= document.querySelector(".menu-categories");

    /*** Génération des boutons et insertion des catégories */
    for (let i=0; i<categoriesArray.length; i++) {
        const categorie= categoriesArray[i];
        const boutonElement= document.createElement("button");
        boutonElement.innerText= categorie;
        boutonElement.classList="btn-filtre";
        menuElement.appendChild(boutonElement);
    }
};

/*** Définition de la fonction ajoutant les Event Listener aux boutons filtres */

export function ajoutListenerFiltre (works) {
    /*** Récupération des éléments HTML nécessaires */

    const boutonsFiltre = document.querySelectorAll (".menu-categories .btn-filtre");

    /*** Ajout de l'Event Listener appellant une fonction filtre */

    for (let i=0; i<boutonsFiltre.length; i++) {
        boutonsFiltre[i].addEventListener("click", async function (event) {
            const value= event.target.innerText;
            const projetsFiltres= works.filter(function (projet) {
                return projet.category.name == value;
            })

            genererProjets (projetsFiltres);


        } )
    }
};


/*** Définition d'une fonction générant entièrement le bouton réinitialiser */

export function genererBoutonReset (works) {
    const menuElement= document.querySelector(".menu-categories");
    const boutonReset= document.createElement("button");
    boutonReset.innerText = "Tous";
    menuElement.appendChild(boutonReset);
    boutonReset.addEventListener("click", function () {
        genererProjets(works);
    });
}