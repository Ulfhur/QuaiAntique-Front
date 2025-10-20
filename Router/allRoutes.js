import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/galerie", "Galerie", "/pages/galerie.html", []),
    new Route("/carte", "La carte", "/pages/carte.html", []),
    new Route("/signin", "Connexion", "/pages/signin.html" , ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/Auth/moncompte.html", ["user", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/Auth/editpassword.html", ["user", "admin"]),
    new Route("/allResa", "Mes réservations", "/pages/Reservations/allResa.html", ["user"]),
    new Route("/newResa", "Nouvelle réservation", "/pages/Reservations/newResa.html", ["user"])
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";