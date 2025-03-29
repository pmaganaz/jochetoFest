class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<nav class="nav navbar navbar-expand-lg navbar-dark">
      <!-- NAV CONTAINER START -->
      <div class="container-fluid">
        <a href="./index.html" class="navbar-brand fw-semibold fs-4">Home</a>
        <!-- NAV BUTTON  -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuLateral"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- OFFCANVAS MAIN CONTAINER START -->
        <section
          class="offcanvas offcanvas-start"
          id="menuLateral"
          tabindex="-1"
        >
          <div class="offcanvas-header" data-bs-theme="dark">
          <a href="./index.html" class="navbar-brand fw-semibold fs-4"><h5 class="offcanvas-title">Jocheto Fest</h5></a>
            <button
              class="btn-close"
              type="button"
              aria-label="Close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <!-- OFF CANVAS MENU LINKS  START-->
          <div
            class="offcanvas-body d-flex flex-column justify-content-between px-0"
          >
            <ul class="navbar-nav fs-5 justify-content-evenly">
              <li class="nav-item p-3 py-md-1">
                <a href="./codigo_vestimenta.html" class="nav-link">Código de Vestimenta</a>
              </li>
              <li class="nav-item p-3 py-md-1">
                <a href="./direccion.html" class="nav-link">Dirección del Evento</a>
              </li>
              <li class="nav-item p-3 py-md-1">
                <a href="./mesa.html" class="nav-link">Ubica tu lugar</a>
              </li>
            </ul>
            <!-- enlaces redes sociales -->

            <div class="d-lg-none align-self-center py-3">
              <a href="https://www.facebook.com/josealberto.magana.12?locale=es_LA"><i class="bi bi-facebook text-white-50 px-2 fs-2"></i></a>
              <a href="https://wa.me/+5219933059796"><i class="bi bi-whatsapp text-white-50 px-2 fs-2"></i></a>
            </div>
          </div>
        </section>
        <!-- OFFCANVAS MAIN CONTAINER END  -->
      </div>
    </nav>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
