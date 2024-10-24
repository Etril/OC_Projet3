/*** Import des fonctions nécessaires */
import {genererProjets, genererProjetsModale, ajoutListenerModale, openModale, fermerModaleX, fermerModaleEcran, genererCategoriesModale, checkLogin, ajoutLogout, afficherMiniature, retourModale} from "./script_admin.js";

/*** Récupération des projets dans l'API */
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

/*** Appel à la fonction vérifiant si l'utilisateur est bien log-in */

checkLogin();

/*** Appel à la fonction ajoutant le logout */

ajoutLogout();

/*** Effaçage du HTML déjà présent pour les projets */
document.querySelector(".gallery").innerHTML="";

/*** Appel à la fonction génératrice de la gallerie */

genererProjets(works);

/*** Appel à la fonction générant la gallerie de la modale */

genererProjetsModale(works);

/*** Appel à la fonction générant le menu catégorie de la deuxième modale */
genererCategoriesModale (works);

/*** Appel à la fonction ajoutant un event listener sur les liens modaux */

ajoutListenerModale();

/*** Appel aux fonctions permettant de fermer les modales */

fermerModaleX();
fermerModaleEcran();

/*** Appel à la fonction permettant de revenir en arrière */

retourModale();

/*** Appel à la fonction permettant d'afficher une miniature de l'image */

afficherMiniature();



