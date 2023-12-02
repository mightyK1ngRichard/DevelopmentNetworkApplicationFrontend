import {useNavigate} from 'react-router-dom';
import {FC, useEffect, useState} from 'react';
import {ICity} from "../../models/models.ts";
import List from "../List.tsx";
import CityItem from "../CityItem/CityItem.tsx";
import './CitiesList.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchCities} from "../../store/reducers/ActionCreator.ts";

interface CitiesListProps {
    setPage: () => void
    searchValue?: string
    resetSearchValue: () => void;
}

const CitiesList: FC<CitiesListProps> = ({setPage, searchValue}) => {
    const dispatch = useAppDispatch()
    const {cities, isLoading, error} = useAppSelector(state => state.cityReducer)
    const [reloadPage, setReloadPage] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPage()
        dispatch(fetchCities(searchValue))
    }, [searchValue, reloadPage]);

    return (
        <>
            {isLoading && <h1> Загрузка данных .... </h1>}
            {error == "" && <h1> {error} </h1>}
            <List items={cities} renderItem={(city: ICity) =>
                <CityItem
                    key={city.id}
                    city={city}
                    isServer={true}
                    onClick={(num) => navigate(`/cities/${num}`)}
                    reloadPage={() => {
                        setReloadPage(true)
                    }}
                />
            }
            />
        </>
    )
};

export default CitiesList;