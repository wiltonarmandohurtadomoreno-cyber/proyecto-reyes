function cargarPagina(pagina) {
    fetch('pages/' + pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('contenido').innerHTML = data;
            localStorage.setItem("paginaActual", pagina);
        })
        .catch(error => {
            document.getElementById('contenido').innerHTML =
                "<p>Error cargando el contenido</p>";
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {

    const paginaGuardada = localStorage.getItem("paginaActual");

    if (paginaGuardada) {
        cargarPagina(paginaGuardada);
    } else {
        cargarPagina("home.html");
    }

});
document.addEventListener("DOMContentLoaded", function () {
    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const videoTitle = document.getElementById("videoModalTitle");

    if (videoModal) {
        videoModal.addEventListener("show.bs.modal", function (event) {
            const button = event.relatedTarget;

            const videoUrl = button.getAttribute("data-video");
            const title = button.getAttribute("data-title");

            videoTitle.textContent = title;

            let separator = videoUrl.includes("?") ? "&" : "?";
            videoFrame.src = videoUrl + separator + "autoplay=1";
        });

        videoModal.addEventListener("hidden.bs.modal", function () {
            videoFrame.src = "";
        });
    }
});
