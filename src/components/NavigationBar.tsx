import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import LoadAnimation from "./Popup/MyLoaderComponent.tsx";
import MyComponent from "./Popup/Popover.tsx";
import Cookies from "js-cookie";
import {userSlice} from "../store/reducers/UserSlice.ts";

interface NavigationBarProps {
    handleSearchValue: (value: string) => void;
}

const NavigationBar: FC<NavigationBarProps> = ({handleSearchValue}) => {
    const dispatch = useAppDispatch()
    const {isLoading, success, error, isAuth} = useAppSelector(state => state.userReducer)
    const role = Cookies.get('role')
    
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = (e.currentTarget.elements.namedItem('search') as HTMLInputElement)?.value;
        handleSearchValue(inputValue);
    };

    const handleLogout = () => {
        Cookies.remove('jwtToken');
        dispatch(userSlice.actions.setAuthStatus(false))
        // dispatch(logoutSession())
    };

    return (
        <>
            {isLoading && <LoadAnimation/>}
            {error != "" && <MyComponent isError={true} message={error}/>}
            {success != "" && <MyComponent isError={false} message={success}/>}

            <Navbar expand="sm" className="bg-black" data-bs-theme="dark">
                <div className="container-xl px-2 px-sm-3">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {role == '2' &&
                            <Nav.Item>
                                <Link to="/cities/admin" className="nav-link ps-0">
                                    Админка городов
                                </Link>
                            </Nav.Item>
                            }
                            <Nav.Item>
                                <Link to="/cities" className="nav-link ps-0">
                                    Города
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/request" className="nav-link">
                                    Заявка
                                </Link>
                            </Nav.Item>
                        </Nav>
                        <Form onSubmit={handleSearch} className="d-flex">
                            <FormControl
                                id={'search-text-field'}
                                type="text"
                                name="search"
                                placeholder="Поиск городов"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button type="submit" variant="outline-light">
                                Поиск
                            </Button>
                        </Form>
                        {isAuth ? (
                            <Nav className="ms-2">
                                <Nav.Item>
                                    <Button variant="outline-light" onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                </Nav.Item>
                            </Nav>
                        ) : (
                            <>
                                <Nav className="ms-2">
                                    <Nav.Item>
                                        <Link to="/login" className="btn btn-outline-light">
                                            Войти
                                        </Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav className="ms-2">
                                    <Nav.Item>
                                        <Link to="/register" className="btn btn-outline-primary">
                                            Регистрация
                                        </Link>
                                    </Nav.Item>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    );
};

export default NavigationBar;
