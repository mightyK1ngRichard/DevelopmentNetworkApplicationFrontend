import {useNavigate} from 'react-router-dom';
import {FC, useEffect} from 'react';
import {ICity} from "../../models/models.ts";
import List from "../List.tsx";
import CityItem from "../CityItem/CityItem.tsx";
import './CitiesList.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchCities} from "../../store/reducers/ActionCreator.ts";
import LoadAnimation from "../Popup/MyLoaderComponent.tsx";
import MyComponent from "../Popup/Popover.tsx";

interface CitiesListProps {
    setPage: () => void
    searchValue?: string
    resetSearchValue: () => void;
}

const CitiesList: FC<CitiesListProps> = ({setPage, searchValue}) => {
    const dispatch = useAppDispatch()
    const {cities, isLoading, error, success} = useAppSelector(state => state.cityReducer)
    const navigate = useNavigate();

    useEffect(() => {
        setPage()
        dispatch(fetchCities(searchValue))
    }, [searchValue]);

    return (
        <>
            {isLoading && <LoadAnimation/>}
            {error != "" && <MyComponent isError={true} message={error}/>}
            {success != "" && <MyComponent isError={false} message={success}/>}
            <List items={cities} renderItem={(city: ICity) =>
                <CityItem
                    key={city.id}
                    city={city}
                    isServer={true}
                    onClick={(num) => navigate(`/cities/${num}`)}
                />
            }
            />
        </>
    )
};

export default CitiesList;