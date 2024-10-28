/*** Import des fonctions nécessaires */
import {genererProjets, genererProjetsModale, ajoutListenerModale, openModale, fermerModaleX, fermerModaleEcran, genererCategoriesModale, checkLogin, ajoutLogout, afficherMiniature, retourModale, viderFormulaire, ajoutListenerAdd, validerFormulaire, envoyerFormulaireAjout, supprimerProjets, annulerMiniature} from "./script_admin.js";


/*** Appel à la fonction vérifiant si l'utilisateur est bien log-in */

checkLogin();

/*** Appel à la fonction ajoutant le logout */

ajoutLogout();

/*** Effaçage du HTML déjà présent pour les projets */
document.querySelector(".gallery").innerHTML="";

/*** Appel à la fonction génératrice de la gallerie */

genererProjets();

/*** Appel à la fonction ajoutant un event listener sur les liens modaux */

ajoutListenerModale();

/*** Appel aux fonctions permettant de fermer les modales */

fermerModaleX();
fermerModaleEcran();

/*** Appel à la fonction permettant de revenir en arrière */

retourModale();

/*** Appel à la fonction ajoutant un event listener sur le submit du formulaire */

ajoutListenerAdd();

