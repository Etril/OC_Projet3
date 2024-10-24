/*** Definition d'une fonction verifiant si la personne est bien log-in */

export function checkLogin () {
    const login = sessionStorage.getItem("login");
    if (login !="true") {
        window.location.href = "login.html"; 
    }
    console.log(login);
}

/*** Definition d'une fonction permettant de se déconnecter */

export function ajoutLogout() {
    const logoutElement= document.querySelector(".logout");
    logoutElement.addEventListener("click", function () {
        sessionStorage.clear();
    });
};

/*** Definition de la fonction génératrice de la gallerie dans la modale */

export function genererProjetsModale(works) {
    document.querySelector(".gallerie-mini").innerHTML="";

    for (let i=0; i<works.length; i++) { 
        const projet = works[i];
        const galleryElement= document.querySelector(".gallerie-mini");
        const figureElement= document.createElement("figure");
        const imageElement= document.createElement("img");
        const lienElement= document.createElement("a");
        const iconeElement= document.createElement("i");
        iconeElement.innerHTML= `<i class="fa-solid fa-trash-can">`;
        lienElement.classList.add("icone");
        lienElement.setAttribute("href", "#");
        imageElement.src= projet.imageUrl;
        lienElement.appendChild(iconeElement);
        figureElement.appendChild(lienElement);
        figureElement.appendChild(imageElement);
        galleryElement.appendChild(figureElement);
    }
};

/*** Definition de la fonction permettant d'ouvrir la modale visée par le lien cliqué*/

export function openModale(e) {
    e.preventDefault();
    const target= document.querySelector(e.target.getAttribute("href"));
    console.log(target);
    target.style.display = "block";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
}

/*** Definition d'une fonction ajoutant un event Listener sur les liens ouvrant des modales*/
export function ajoutListenerModale() {
    const modaleElement= document.querySelectorAll(".lien-modale");
    modaleElement.forEach(a => {
        a.addEventListener("click", function(e) {
        openModale(e);
    });
})
};

/*** Definition d'une fonction permettant de fermer la modale lors du clic sur le X ***/

export function fermerModaleX () {
    const x= document.querySelectorAll(".fa-xmark");
    x.forEach(a => {
        a.addEventListener("click", function() {
            const modaleFermerElement= document.querySelectorAll(".modale");
            modaleFermerElement.forEach(b => {
                b.style.display= "none"
            });
            modaleFermerElement.forEach(c => {
                c.setAttribute("aria-hidden", "true");
            });
            modaleFermerElement.forEach(d => {
                d.setAttribute("aria-modal", "false");
            });
            console.log("fermer modale");
        })
    })
};

/*** Definition d'une fonction permettant de fermer la modale lors du clic hors de la fenêtre */

export function fermerModaleEcran() {
    window.onclick = function(event) {
        const modale = document.querySelectorAll('.modale');
        if (event.target.matches(".lien-modale")) {
            return
        }
        if (!event.target.closest('.modal-wrapper'))
            modale.forEach(b => {
                b.style.display= "none";
            });
            console.log("fermer modale");
        
    }
};


/*** Definition d'une fonction générant la gallerie des projets */

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

/*** Definition d'une fonction pour générer le menu des categories dans la modale 2 */

export function genererCategoriesModale (works) {

/*** Génération d'une array contenant les catégories sans doublons */
   
    const categoriesMap= works.map (works => works.category.name);
    const categoriesSet= new Set (categoriesMap);
    const categoriesArray = Array.from(categoriesSet);

    const champElement= document.getElementById("champ-categories");

    /*** Génération des boutons et insertion des catégories */
    for (let i=0; i<categoriesArray.length; i++) {
        const categorie= categoriesArray[i];
        const optionElement= document.createElement("option");
        optionElement.innerText= categorie;
        optionElement.setAttribute("value", categorie);
        champElement.appendChild(optionElement);
    }
};

/*** Definition d'une fonction pour afficher une miniature de l'image à uploader */

export function afficherMiniature () {
    const ajoutElement= document.getElementById("ajout-photo");
    ajoutElement.addEventListener("change", function () {
        const file= ajoutElement.files;
        const divElement= document.querySelector(".ajout-photo");
        const imageElement= document.getElementById("file-preview");
        if (file) {
        const fileReader= new FileReader();
        fileReader.onload= event => {
            imageElement.src= event.target.result;
            console.log(imageElement);
            console.log(event.target.result);
        }
        fileReader.readAsDataURL(file[0]);
    }
    imageElement.style.display = "block";
    divElement.innerHTML="";
    divElement.appendChild(imageElement);
});
};


export function retourModale () {
    const flecheElement= document.querySelector(".fa-arrow-left");
    flecheElement.addEventListener("click", function() {
            const modaleFermerElement= document.querySelectorAll(".modale");
            modaleFermerElement.forEach(b => {
                b.style.display= "none"
            });
            modaleFermerElement.forEach(c => {
                c.setAttribute("aria-hidden", "true");
            });
            modaleFermerElement.forEach(d => {
                d.setAttribute("aria-modal", "false");
            });
            
            document.getElementById("lien-modale-un").click();
        })
};
