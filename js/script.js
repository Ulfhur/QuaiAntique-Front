const fakeTokenCookieName = "accesstoken";
const btnSignout = document.getElementById("btn-signout");
const roleCookieName = "role";

btnSignout.addEventListener("click", signout);

function getRole() {
    return getCookie(roleCookieName);
}

function signout() {
    eraseCookie(fakeTokenCookieName);
    eraseCookie(roleCookieName);
    alert("Vous êtes déconnecté. Retourn à la page d'accueil.");
    globalThis.location.href = "/";
}

function setFakeToken(fakeToken) {
    setCookie(fakeTokenCookieName, fakeToken, 7); // Le cookie expire dans 7 jours
}

function getFakeToken() {
    return getCookie(fakeTokenCookieName);
}  

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (const raw of ca) {
        let c = raw;
        while (c.startsWith(' ')) c = c.substring(1);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    return getFakeToken() != null;
}

function showAndHideMenuItemsForRole() {
    const role = getRole();
    const userConnected = isConnected();

    let elementsToShow = document.querySelectorAll('[data-show]');

    for (const element of elementsToShow) {
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected) {
                    element.classList.add('d-none');
                }
                break;
            case 'connected':
                if(!userConnected) {
                    element.classList.add('d-none');
                }
                break;
            case 'admin':
                if(!userConnected || role !== 'admin') {
                    element.classList.add('d-none');
                }
                break;
            case 'user':
                if(!userConnected || role !== 'user') {
                    element.classList.add('d-none');
                }
                break;
        }
    }
}

const spinnerWrapperEnd = document.querySelector('.spinner-wrapper');

globalThis.addEventListener('load', () => {
    spinnerWrapperEnd.style.opacity = '0';
    setTimeout(() => {
        spinnerWrapperEnd.style.display = 'none';
    }, 200);
});

function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;  
}
