const btnReservation = document.getElementById("btn-reservation");

btnReservation.addEventListener("click", checkRoleUser);

function checkRoleUser() {
    const roleUser = getRole();
    if(roleUser === "user") {
        // L'utilisateur est connecté, il peut accéder à la page de réservation
        window.location.href = "/newResa";
    } else {
        // L'utilisateur n'est pas connecté, redirection vers la page de connexion
        alert("Vous devez être connecté pour faire une réservation. Vous allez être redirigé vers la page de connexion.");
        window.location.href = "/signin";
    }
}
