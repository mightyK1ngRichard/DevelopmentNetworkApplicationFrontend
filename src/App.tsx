import {Routes, Route, Navigate} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.tsx";
import CitiesList from "./components/CitiesList/CitiesList.tsx";
import CityDetail from "./components/CityDetail/CityDetail.tsx";
import {useState} from "react";
import BreadCrumbs, {IBreadCrumb} from "./components/BreadCrumbs/BreadCrumbs.tsx";
import RequestView from "./components/RequestView/RequestView.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";

function App() {
    const citiesPage = {name: 'Города', to: 'cities'};
    const requestPage = {name: 'Заявка', to: 'request'};
    const [searchValue, setSearchValue] = useState('')
    const [pages, setPage] = useState<IBreadCrumb[]>([citiesPage])
    const addPage = (newPage: IBreadCrumb[]) => {
        setPage(newPage);
    };
    const resetSearchValue = () => {
        setSearchValue('');
    };

    return (
        <>
            <NavigationBar handleSearchValue={(value) => setSearchValue(value)}/>
            <BreadCrumbs pages={pages}/>
            <>
                <Routes>
                    <Route path="/" element={<Navigate to="cities"/>}/>
                    <Route path="/cities"
                           element={
                               <CitiesList
                                   setPage={() => addPage([citiesPage])}
                                   searchValue={searchValue}
                                   resetSearchValue={resetSearchValue}
                               />
                           }
                    />
                    <Route path="/request"
                           element={
                               <RequestView
                                   setPage={() => addPage([requestPage])}
                               />
                           }
                    />
                    <Route path="/login"
                           element={
                               <LoginPage/>
                           }
                    />
                    <Route path="/register"
                           element={
                               <RegisterPage/>
                           }
                    />
                    <Route path="/cities/:id" element={
                        <CityDetail
                            setPage={(name, id) => addPage([
                                citiesPage, {name: `Город-${name}`, to: `cities/${id}`}
                            ])}
                        />}
                    />
                </Routes>
            </>
        </>
    )
}


export default App
