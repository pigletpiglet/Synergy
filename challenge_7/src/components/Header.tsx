interface tokenInitialState {
  token: string;
}

export default function Header() {
  return (
    <nav className="flex justify-between">
      <div className="navbar-brand pe-5" style={{ backgroundColor: "#0D28A6", height: 34, width: "100px" }}>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto gap-4">
          <li className="nav-item">
            <a className="nav-link" href="#main-section" role="button">
              Our Services
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#why-section" role="button">
              Why us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#testimonial-section" role="button">
              Testimonial
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#faq-section" role="button">
              FAQ
            </a>
          </li>
          <li className="nav-item">
            <button type="button" className="btn text-white" style={{ background: "#5CB85F" }}>Register</button>
          </li>

        </ul>
      </div>

    </nav >
  );
}
