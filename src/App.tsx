import {Routes, Route, Navigate} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.tsx";
import CitiesList from "./components/CitiesList/CitiesList.tsx";
import CityDetail from "./components/CityDetail/CityDetail.tsx";
import {useState} from "react";
import BreadCrumbs, {IBreadCrumb} from "./components/BreadCrumbs/BreadCrumbs.tsx";
import RequestView from "./components/RequestView/RequestView.tsx";

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
                                   authorName={'Dmitriy Permyakov'}
                                   authorProfession={'iOS Developer'}
                                   authorPhoto={'https://sun9-76.userapi.com/impg/9UT7SzAC_gHL2GBES69P-hXudzqKmS8_f0oPXA/AN2fmitt7Bs.jpg?size=1080x1920&quality=95&sign=812fa659cab85e0be2fc74516dc27ae7&type=album'}
                                   authorLogin={'mightyK1ngRichard'}
                                   startDate={'14-03-2003'}
                                   endDate={'21-02-2003'}
                                   leader={'Лидер Номер'}
                                   description={'Просто какое-то описание'}
                               />
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
