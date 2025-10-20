import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/carte", "La carte", "/pages/carte.html"),
    new Route("/signin", "Connexion/Déconnexion", "/pages/signin.html" , "/js/auth/signin.js"),    
    new Route("/signup", "Inscription", "/pages/signup.html", "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/Auth/moncompte.html"),
    new Route("/editPassword", "Changement de mot de passe", "/pages/Auth/editpassword.html"),
    new Route("/allResa", "Mes réservations", "/pages/Reservations/allResa.html"),
    new Route("/newResa", "Nouvelle réservation", "/pages/Reservations/newResa.html")
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";