

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
        lienElement.setAttribute("id", `${projet.id}`);
        imageElement.src= projet.imageUrl;
        lienElement.appendChild(iconeElement);
        figureElement.appendChild(lienElement);
        figureElement.appendChild(imageElement);
        galleryElement.appendChild(figureElement);
        lienElement.addEventListener("click", function () {
            const iconeId= lienElement.getAttribute("id");
            supprimerProjets(iconeId);
    });
    };
}; 



export async function supprimerProjets (iconeId) {
    const token = sessionStorage.getItem("token");

    const requete= {
        "id": iconeId
    }
    const payLoad= JSON.stringify(requete);
    console.log (requete);
    console.log(payLoad);
    
    try {
     const response= await fetch (`http://localhost:5678/api/works/${iconeId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
        body: payLoad
    })

    if (!response.ok) {
        const loginElement= document.querySelector(".login-main h2");
        const loginErreur= document.createElement("p");
        loginErreur.innerText="";
        loginErreur.innerText= "L'identifiant ou le mot de passe est erroné";
        loginErreur.classList.add("login-erreur");
        loginElement.replaceChildren(loginErreur);
        throw new Error (`Erreur: ${response.status}`);
        
    }

    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

    console.log(`Le projet ${iconeId} a bien été supprimé`);

    genererProjets(works);
    genererProjetsModale(works);

}   catch (error) {
        console.error(error.message);
    }

};





/*** Definition de la fonction permettant d'ouvrir la modale visée par le lien cliqué*/

export async function openModale(e) {
    e.preventDefault();
    const target= document.querySelector(e.target.getAttribute("href"));
    console.log(target);
    target.style.display = "block";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    genererCategoriesModale (works);
    genererProjetsModale(works);
    afficherMiniature();
    ajoutListenerAdd ();
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
            viderFormulaire();
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
                viderFormulaire();
            });
        
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
    champElement.innerText= "";

    /*** Génération des boutons et insertion des catégories */
    for (let i=0; i<categoriesArray.length; i++) {
        const categorie= categoriesArray[i];
        const categorieId= (works.find (works => works.category.name == categorie)).id;
        const optionElement= document.createElement("option");
        optionElement.innerText= categorie;
        optionElement.setAttribute("value", categorieId);
        champElement.appendChild(optionElement);
    }
};

/*** Definition d'une fonction pour afficher une miniature de l'image à uploader */

export function afficherMiniature () {
    const ajoutElement= document.getElementById("ajout-photo");
    ajoutElement.addEventListener("change", function () {
        const file= ajoutElement.files;
        const formElement= document.querySelector(".ajout-photo");
        const imageElement= document.getElementById("file-preview");
        if (file) {
        const fileReader= new FileReader();
        fileReader.onload= event => {
            imageElement.src= event.target.result;
        }
        fileReader.readAsDataURL(file[0]);
    }
    imageElement.style.display = "block";
    formElement.style.display= "none";
});
};


/*** Definition d'une fonction pour revenir sur la modale précédente */

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

/*** Definition d'une fonction pour vider le formulaire quand on quitte la modale */

export async function viderFormulaire () {
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    const formElement=document.getElementById("formulaire-ajout");
    formElement.innerHTML="";
    formElement.innerHTML=`<div class="background">
						<div class="preview-photo">
							<img src="#" alt="Image à ajouter" id="file-preview">
						<div class="ajout-photo">
						<i class="fa-regular fa-image"></i>
						<label for="ajout-photo" class="custom-ajout"> <span class= "text-ajout">+Ajouter photo </span> </label>
						<input type="file" id="ajout-photo" accept="image/png, image/jpg">
						<p> jpg, png: 4mo max </p>
						</div>
						</div>
						</div>
						<label for="titre"> Titre </label> 
						<input type="text" id="titre" name="titre"> 
						<label for="champ-categories"> Categorie </label> 
						<select id="champ-categories" name="champ-categories" form="formulaire-ajout"> 

						</select>
						<div class="line-modale"> </div>
						<input type="submit" value="Valider">`;
    afficherMiniature ();
    genererCategoriesModale(works);
}


/*** Ajout d'un Event Listener sur le formulaire */

export function ajoutListenerAdd () {
    const formAjout= document.getElementById("formulaire-ajout");
    formAjout.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData= new FormData();
        const image= document.getElementById("file-preview").src;
        console.log(image);
        const titre= document.getElementById("titre").value;
        const categorie= parseInt(document.getElementById("champ-categories").value);
        formData.append("image", image);
        formData.append("title", titre);
        formData.append("category", categorie);
        validerFormulaire (formData);
    });
};

/*** Fonction validant le formulaire */

export function validerFormulaire (titre, formData) {
    // let regexTitre= new RegExp ("[a-zA-Za-z0-9._-]+");


    // if (regexTitre.test(titre.trim()) === false) {
    //     const erreurElement= document.getElementById("titre-modale-deux");
    //     const erreurTitre= document.createElement("p");
    //     erreurTitre.innerText= "Le titre ne peut pas être vide";
    //     erreurTitre.classList.add("erreur");
    //     erreurElement.replaceChildren(erreurTitre);
    //     viderFormulaire ();
    //     return
    // };

    return envoyerFormulaireAjout (titre, formData);

};

/*** Definition de la fonction envoyant la requête pour ajouter le projet */

export async function envoyerFormulaireAjout (formData) {
    const token = sessionStorage.getItem("token");
    
    try {
     const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}` 
         },
        body: formData
    })

    if (!response.ok) {
        const erreurElement= document.getElementById("titre-modale-deux");
        const erreurTitre= document.createElement("p");
        erreurTitre.innerText= "Erreur sur l'envoi";
        erreurTitre.classList.add("erreur");
        erreurElement.replaceChildren(erreurTitre);
        viderFormulaire ();
        console.log(payLoad);
        throw new Error (`Erreur: ${response.status}`);
        

    }

    console.log("projet bien ajouté");
    const erreurElement= document.getElementById("titre-modale-deux");
    const erreurTitre= document.createElement("p");
    erreurTitre.innerText= "Projet bien envoyé";
    erreurTitre.classList.add("erreur");
    erreurElement.replaceChildren(erreurTitre);
    viderFormulaire ();



}   catch (error) {
        console.error(error.message);
    }

};