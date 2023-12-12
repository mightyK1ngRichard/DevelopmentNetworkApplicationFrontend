import {Routes, Route, Navigate} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar/NavigationBar.tsx";
import CitiesList from "./components/CitiesList/CitiesList.tsx";
import CityDetail from "./components/CityDetail/CityDetail.tsx";
import {useState} from "react";
import BreadCrumbs, {Breadcrumb} from "./components/BreadCrumbs/BreadCrumbs.tsx";
import RequestView from "./components/RequestView/RequestView.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";
import CityTable from "./components/CityTable/CityTable.tsx";
import CreateCityPage from "./components/TableView/AddCity.tsx";
import HikeCard from "./components/RequestView/HikeCard.tsx";

function App() {
    const citiesPage: Breadcrumb = {name: 'Города', to: 'cities'};
    const requestPage: Breadcrumb = {name: 'Заявки', to: 'request'};
    const [searchValue, setSearchValue] = useState('')
    const [pages, setPage] = useState<Breadcrumb[]>([citiesPage])
    const addPage = (newPage: Breadcrumb[]) => {
        setPage(newPage);
    };
    const resetSearchValue = () => {
        setSearchValue('');
    };

    return (
        <>
            <NavigationBar handleSearchValue={(value) => setSearchValue(value)}/>
            <BreadCrumbs paths={pages}/>
            <>
                <Routes>
                    <Route path="/" element={<Navigate to="cities"/>}/>
                    <Route path="/cities" element={
                        <CitiesList
                            setPage={() => addPage([citiesPage])}
                            searchValue={searchValue}
                            resetSearchValue={resetSearchValue}
                        />
                    }
                    />
                    <Route path="/request" element={
                        <RequestView
                            setPage={() => addPage([requestPage])}
                        />
                    }
                    />
                    <Route path="/add-city" element={<CreateCityPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/cities/admin" element={<CityTable/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/hikes/:hike_id" element={
                        <HikeCard setPage={
                            (name, id) => addPage([requestPage, {
                                name: `Поход: "${name}"`,
                                to: `hike/${id}`
                            }])
                        }/>
                    }/>
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
