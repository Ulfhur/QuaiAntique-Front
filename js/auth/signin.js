const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const btnConnexion = document.getElementById("btn-connexion");

btnConnexion.addEventListener("click", checkCredentials);

function checkCredentials() {
    // Ici, il faudra appeler une API pour vérifier les identifiants

    if (inputEmail.value === "test@test.com" && inputPassword.value === "P@ssw0rd") {
        alert("Connexion réussie ! Retour à la page d'accueil.");
        // Il faudra récupérer le vrai token depuis l'API
        const fakeToken = "abcdef1234567890";
        setFakeToken(fakeToken);

        // Rediriger vers la page d'accueil ou tableau de bord
        setCookie(roleCookieName, "admin", 7); // Exemple de rôle Admin
        window.location.href = "/";
    }
    else {
        inputEmail.classList.add("is-invalid");
        inputPassword.classList.add("is-invalid");
        alert("Email ou mot de passe incorrect.");
    }
}