import Route from "./route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// 🧭 Définition de la route 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// 🔍 Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  for (const element of allRoutes) {
    if (element.url === url) return element;
  }
  // Si aucune route ne correspond, on renvoie la 404
  return route404;
};

// ⚙️ Fonction principale pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = globalThis.location.pathname;
  const actualRoute = getRouteByUrl(path);

  // 🧩 Vérification des autorisations (connexion / rôle)
  const allRoleArray = actualRoute.authorize ?? [];

  // Cas : utilisateur non connecté qui tente d'accéder à /newResa
  if (actualRoute.url === "/newResa" && !isConnected()) {
    alert("Vous devez être connecté pour faire une réservation. Redirection vers la page de connexion.");
    globalThis.location.href = "/signin";
    return;
  }

  // Vérification des rôles d'accès
  if (allRoleArray.length > 0) {
    if (allRoleArray.includes("disconnected")) {
      if (isConnected()) {
        alert("Vous êtes déjà connecté.");
        globalThis.location.href = "/";
        return;
      }
    } else {
      const roleUser = getRole();
      if (!allRoleArray.includes(roleUser)) {
        alert("Vous n'avez pas les droits d'accès à cette page.");
        globalThis.location.href = "/";
        return;
      }
    }
  }

  // 🧾 Chargement du contenu HTML de la route
  try {
    const response = await fetch(actualRoute.pathHtml);
    if (!response.ok) {
      console.error(`Erreur de chargement (${response.status}) : ${actualRoute.pathHtml}`);
      await load404Page();
      return;
    }

    const html = await response.text();
    document.getElementById("main-page").innerHTML = html;
  } catch (err) {
    console.error("Erreur réseau ou chargement échoué :", err);
    await load404Page();
    return;
  }

  // 🧠 Chargement du script associé à la page
  loadPageScript(actualRoute.pathJS);

  // 🏷️ Mise à jour du titre
  document.title = `${actualRoute.title} - ${websiteName}`;

  // 🔐 Mise à jour des menus selon le rôle utilisateur
  showAndHideMenuItemsForRole();
};

// 📜 Fonction utilitaire : chargement de la page 404
const load404Page = async () => {
  try {
    const response = await fetch(route404.pathHtml);
    const html = await response.text();
    document.getElementById("main-page").innerHTML = html;
    document.title = `${route404.title} - ${websiteName}`;
  } catch (err) {
    console.error("Impossible de charger la page 404 :", err);
    document.getElementById("main-page").innerHTML = "<h2>Erreur 404 - Page introuvable</h2>";
  }
};

// 🧩 Fonction utilitaire : chargement propre du JS d'une page
const loadPageScript = (pathJS) => {
  // Supprime les anciens scripts de page
  const oldScripts = document.querySelectorAll("script[data-page-script]");
  for (const s of oldScripts) {
    s.remove();
  }

  // Si la route a un script, on le charge
  if (pathJS && pathJS.trim() !== "") {
    const scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.src = pathJS;
    scriptTag.dataset.pageScript = "true";
    document.body.appendChild(scriptTag);
  }
};

// 🧭 Gestion du clic sur les liens internes
const routeEvent = (evt) => {
  if (!evt) return;
  evt.preventDefault();

  const link = evt.currentTarget || evt.target;
  const href = link?.href ?? "";

  globalThis.history.pushState({}, "", href);
  LoadContentPage();
};

// 🔁 Gestion du retour arrière dans l'historique
globalThis.onpopstate = LoadContentPage;

// 🪄 Exposition de la fonction route pour utilisation globale
globalThis.route = routeEvent;

// 🚀 Chargement initial de la page au démarrage
LoadContentPage();
