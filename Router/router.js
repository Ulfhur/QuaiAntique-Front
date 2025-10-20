import Route from "./route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondance
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  // Si aucune correspondance n'est trouvée, on retourne la route 404
  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = window.location.pathname;
  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);
  // Vérification des autorisations d'accès à la route
  const allRoleArray = actualRoute.authorize;

  // Utilisateur déconnecté souhaitant se rendre sur la page réservation
  if (actualRoute.url === "/newResa" && !isConnected()) {
    alert("Vous devez être connecté pour faire une réservation. Vous allez être redirigé vers la page de connexion.");
    window.location.href = "/signin";
    return;
  }

  // Vérification des rôles pour l'accès à la route
  if (allRoleArray.length > 0) {
    if(allRoleArray.includes("disconnected")) {
      if(isConnected()) {
        alert("Vous êtes déjà connecté.");
        window.location.href = "/";
        return;
      }
    }
    else {
      const roleUser = getRole();
      if(!allRoleArray.includes(roleUser)) {
        alert("Vous n'avez pas les droits d'accès à cette page.");
        window.location.href = "/";
        return;
      }
    }
  }
  // Récupération du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Ajout du contenu HTML à l'élément avec l'ID "main-page"
  document.getElementById("main-page").innerHTML = html;

  // Ajout du contenu JavaScript
  if (actualRoute.pathJS != "") {
    // Création d'une balise script
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);

    // Ajout de la balise script au corps du document
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websiteName;

  // Gestion des éléments de menu en fonction du rôle de l'utilisateur
  showAndHideMenuItemsForRole();
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  // Mise à jour de l'URL dans l'historique du navigateur
  window.history.pushState({}, "", event.target.href);
  // Chargement du contenu de la nouvelle page
  LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();