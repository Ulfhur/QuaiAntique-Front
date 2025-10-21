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
    window.location.href = "/";
}

function setFakeToken(fakeToken) {
    setCookie(fakeTokenCookieName, fakeToken, 7); // Le cookie expire dans 7 jours
}

function getFakeToken() {
    return getCookie(fakeTokenCookieName);
}  

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    if(getFakeToken() == null || getFakeToken() == undefined) {
        return false;
    }
    else {
        return true;
    }
}

function showAndHideMenuItemsForRole() {
    const role = getRole();
    const userConnected = isConnected();

    let elementsToShow = document.querySelectorAll('[data-show]');

    elementsToShow.forEach(element => {
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
    });
}

const spinnerWrapperEnd = document.querySelector('.spinner-wrapper');

window.addEventListener('load', () => {
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
