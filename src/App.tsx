import {Routes, Route, Navigate} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.tsx";
import CitiesList from "./components/CitiesList/CitiesList.tsx";
import CityDetail from "./components/CityDetail/CityDetail.tsx";
import {useState} from "react";
import BreadCrumbs, {IBreadCrumb} from "./components/BreadCrumbs/BreadCrumbs.tsx";
import {useAppDispatch, useAppSelector} from "./hooks/redux.ts";
import {citySlice} from "./store/reducers/CitySlice.ts";
// import {useAppSelector} from "./hooks/redux.ts";


function App() {
    // const {cities, error, isLoading} = useAppSelector(state => state.cityReducer)
    const {count} = useAppSelector(state => state.cityReducer)
    const {increase} = citySlice.actions

    const dispatch = useAppDispatch()
    const citiesPage = {name: 'Города', to: 'cities'};
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
            <div>
                {count}
                <div>
                    <button onClick={() => dispatch(increase(10))}> Increase </button>
                </div>
            </div>

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
