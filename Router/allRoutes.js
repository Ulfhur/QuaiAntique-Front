import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/carte", "La carte", "/pages/carte.html"),
    new Route("/signin", "Connexion/Déconnexion", "/pages/signin.html"),    
    new Route("/signup", "Inscription", "/pages/signup.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";