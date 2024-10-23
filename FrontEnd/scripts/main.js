/*** Import des fonctions nécessaires */
import {genererMenuCategories, genererProjets, ajoutListenerFiltre, genererBoutonReset} from "./script.js";

/*** Récupération des projets dans l'API */
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();




/*** Effaçage du HTML déjà présent pour les projets */
document.querySelector(".gallery").innerHTML="";

/*** Appel à la fonction générant le bouton permettant de réinitialiser les filtres */

genererBoutonReset(works);

/*** Appel à la fonction générant le menu des catégories */
genererMenuCategories(works);

/*** Appel à la fonction ajoutant des Event Listener aux boutons filtres */
ajoutListenerFiltre(works);

/*** Appel à la fonction génératrice de la gallerie */

genererProjets(works);

