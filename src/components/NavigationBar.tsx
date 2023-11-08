import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <use xlinkHref="#bootstrap"></use>
                    </svg>
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/DevelopmentNetworkApplicationFrontend/cities">
                                Города
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Походы
                            </a>
                        </li>
                    </ul>
                </div>

                <form className="d-flex">
                    <input
                        className="form-control form-control-dark me-2"
                        type="search"
                        placeholder="Введите город"
                        aria-label="Search"
                        name="search"
                    />
                    <button className="btn btn-outline-light" type="submit">
                        Поиск
                    </button>
                </form>

                <div className="ms-2">
                    <button className="btn btn-outline-light me-2">Войти</button>
                    <button className="btn btn-primary">Регистрация</button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
