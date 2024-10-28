

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

export async function genererProjetsModale() {
    document.querySelector(".gallerie-mini").innerHTML="";
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

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
    genererCategoriesModale ();
    genererProjetsModale();
    afficherMiniature();
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

export async function genererProjets() {
    document.querySelector(".gallery").innerHTML="";
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

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

export async function genererCategoriesModale () {

    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

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

/*** Definition d'une fonction pour revenir au formulaire d'ajout photo depuis la miniature */

export function annulerMiniature () {

    const boutonAnnuler= document.getElementById("bouton-annuler");
    boutonAnnuler.addEventListener("click", function (e) {
        e.preventDefault();
        viderFormulaire();
    })
}


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
						<div class="container-preview">
							<img src="#" alt="Image à ajouter" id="file-preview">
							<div class="overlay">
								<button id="bouton-annuler" type="button"> Annuler </button>
							</div>
						</div>
						<div class="ajout-photo">
						<i class="fa-regular fa-image"></i>
						<label for="ajout-photo" class="custom-ajout"> <span class= "text-ajout">+ Ajouter photo </span> </label>
						<input type="file" id="ajout-photo" accept="image/png, image/jpg"/>
						<p class="ajout-texte"> jpg, png: 4mo max </p>
						</div>
						</div>
						<label for="titre" class="label-form"> Titre </label> 
						<input type="text" id="titre" name="titre"> 
						<label for="champ-categories" class="label-form"> Categorie </label> 
						<select id="champ-categories" name="champ-categories" form="formulaire-ajout"> 

						</select>
						<div class="line-modale"> </div>
						<input type="submit" id="bouton-valider" value="Valider">`;
    afficherMiniature ();
    annulerMiniature();
    genererCategoriesModale(works);
}


/*** Ajout d'un Event Listener sur le formulaire */

export function ajoutListenerAdd () {
    const formAjout= document.getElementById("formulaire-ajout");
    formAjout.addEventListener("submit", function (event) {
        event.preventDefault();
        const data= new FormData();

        const ajoutElement= document.getElementById("ajout-photo");
        const titre= document.getElementById("titre").value;
        const categorie= parseInt(document.getElementById("champ-categories").value);
        data.append("image", ajoutElement.files[0])
        console.log(ajoutElement.files[0]);
        data.append("title", titre);
        data.append("category", categorie);
        
        validerFormulaire (data, titre);
    })
  };

/*** Fonction validant le formulaire */

export function validerFormulaire (data, titre) {
    let regexTitre= new RegExp ("[a-zA-Za-z0-9._-]+");
    const ajoutElement= document.getElementById("ajout-photo");


    if (ajoutElement.files[0] === undefined) {
        const erreurElement= document.getElementById("titre-modale-deux");
        const erreurTitre= document.createElement("p");
        erreurTitre.innerText= "Erreur: Merci de choisir une image pour votre projet";
        erreurTitre.classList.add("erreur");
        erreurElement.replaceChildren(erreurTitre);
        viderFormulaire ();
        return
    }


    if (regexTitre.test(titre.trim()) === false) {
        const erreurElement= document.getElementById("titre-modale-deux");
        const erreurTitre= document.createElement("p");
        erreurTitre.innerText= "Erreur: Le titre ne peut pas être vide";
        erreurTitre.classList.add("erreur");
        erreurElement.replaceChildren(erreurTitre);
        viderFormulaire ();
        return
    };

     envoyerFormulaireAjout (data);

};

/*** Definition de la fonction envoyant la requête pour ajouter le projet */

export async function envoyerFormulaireAjout (data) {
    const token = sessionStorage.getItem("token");
    
    try {
     const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}` 
         },
        body: data
    })

    if (!response.ok) {
        const annonceElement= document.getElementById("titre-modale-deux");
        const annonceTitre= document.createElement("p");
        annonceTitre.innerText= "Erreur sur l'envoi";
        annonceTitre.classList.add("erreur");
        annonceElement.replaceChildren(annonceTitre);
        viderFormulaire ();
        throw new Error (`Erreur: ${response.status}`);
        

    }

    console.log("projet bien ajouté");
    const annonceElement= document.getElementById("titre-modale-deux");
    const annonceTitre= document.createElement("p");
    annonceTitre.innerText= "Projet bien ajouté";
    annonceTitre.classList.add("success");
    annonceElement.replaceChildren(annonceTitre);
    viderFormulaire ();
    genererProjets();



}   catch (error) {
        console.error(error.message);
    }

};