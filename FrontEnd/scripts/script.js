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


/*** LOGIN */


/*** Ajout d'un Event Listener sur le formulaire */

export function ajoutListenerLogin () {
    const formLogin= document.querySelector("form");
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const mdp= document.getElementById("mdp").value;
        console.log(email);
        console.log(mdp);
        validerFormulaire (email, mdp);
    });
};

/*** Fonction validant le formulaire */

export function validerFormulaire (email, mdp) {
    let regexEmail= new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    let regexMdp= new RegExp ("[a-zA-Za-z0-9._-]+");


    if (regexEmail.test(email.trim()) === false || regexMdp.test(mdp.trim()) === false) {
        const loginElement= document.querySelector(".login-main h2");
        const loginErreur= document.createElement("p");
        loginErreur.innerText= "Les informations ne sont pas dans un format valide";
        loginErreur.classList.add("login-erreur");
        loginElement.replaceChildren(loginErreur);
        console.log("Le formulaire n'est pas valide");
        return

    };

    return envoyerFormulaire (email, mdp);

};

export async function envoyerFormulaire (email, mdp) {
    const requete= {
        "email": email,
        "password": mdp
    }
    const payLoad= JSON.stringify(requete);
    console.log (requete);
    console.log(payLoad);
    
    try {
     const response= await fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

    const token= (await response.json()).token;
    console.log(token);

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("login", "true");

    
    window.location.href = "dashboard.html"; 

}   catch (error) {
        console.error(error.message);
    }

};

