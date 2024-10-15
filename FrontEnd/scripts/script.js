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

export function genererMenuCategories (works) {
    
    /*** Génération d'une array contenant les catégories sans doublons */
    const categoriesMap= works.map (works => works.category.name);
    const categoriesSet= new Set (categoriesMap);
    const categoriesArray = Array.from(categoriesSet);

    /*** Génération des elements HTML necessaires */
    const portfolioElement= document.getElementById("portfolio");
    const menuElement= document.createElement("div");
    menuElement.classList.add("menu-categories");
    const titreMenuElement= document.createElement("h2");
    titreMenuElement.innerText= "Trier par la catégorie: ";
    menuElement.appendChild(titreMenuElement);

    /*** Génération des boutons et insertion des catégories */
    for (let i=0; i<categoriesArray.length; i++) {
        const categorie= categoriesArray[i];
        const boutonElement= document.createElement("button");
        boutonElement.innerText= categorie;
        menuElement.appendChild(boutonElement);
    }

    portfolioElement.appendChild(menuElement);
};


export function ajoutListenerFiltre (works) {
    const boutonsFiltre = document.querySelectorAll (".menu-categories button");


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

export function genererBoutonReset (works) {
    const menuElement= document.querySelector(".menu-categories");
    const boutonReset= document.createElement("button");
    boutonReset.innerText = "Voir tous les projets";
    menuElement.appendChild(boutonReset);
    boutonReset.addEventListener("click", function () {
        genererProjets(works);
    });
}