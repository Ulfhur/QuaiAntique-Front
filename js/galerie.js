const galerieImage = document.getElementById("allImages");
let nomImage = getImage("titre", "../Images/PrésentationAssiette-Plat.jpg");

galerieImage.innerHTML = nomImage;

function getImage(titre, urlImage){
    return ` <div class="col p-3">
                <div class="image-card text-white p-3">
                    <img src="${urlImage}" class="rounded w-100"/>
                    <p class="titre-image">${titre}</p>
                    <div class="action-image-buttons" data-show="admin">
                        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditPhotoModal"><i class="bi bi-pencil-square"></i></button>
                        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>`;
}



