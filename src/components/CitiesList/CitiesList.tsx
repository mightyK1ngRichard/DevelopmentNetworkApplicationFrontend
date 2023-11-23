import {useNavigate} from 'react-router-dom';
import {FC, useEffect, useState} from 'react';
import {ICity, mockCities} from "../../models/models.ts";
import List from "../List.tsx";
import CityItem from "../CityItem/CityItem.tsx";
import './CitiesList.css'

interface CitiesListProps {
    setPage: () => void
    searchValue?: string
    resetSearchValue: () => void;
}

const CitiesList: FC<CitiesListProps> = ({setPage, searchValue, resetSearchValue}) => {
    const [cities, setCities] = useState<ICity[]>([]);
    const [serverIsWork, setServerStatus] = useState<boolean>(false);
    const [reloadPage, setReloadPage] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPage()
        fetchCities()
            .catch((err) => {
                console.log(err)
                if (searchValue) {
                    const filteredCities = mockCities.filter(city =>
                        city.city_name?.toLowerCase().includes((searchValue ?? '').toLowerCase())
                    );
                    setCities(filteredCities);
                } else {
                    setCities(mockCities);
                }
            });
    }, [searchValue, reloadPage]);

    const fetchCities = async () => {
        const url = 'http://localhost:7070/api/v3/cities' + `?search=${searchValue ?? ''}`;

        const response = await fetch(url, {
            method: "GET",
            signal: AbortSignal.timeout(1000)
        })

        if (!response.ok) {
            setServerStatus(false)
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setServerStatus(true)
        setCities(data.cities ?? []);
        if (data.cities == null) {
            alert("Данных нету")
            resetSearchValue()
        }
    }

    return (
        <List items={cities} renderItem={(city: ICity) =>
            <CityItem
                key={city.id}
                city={city}
                isServer={serverIsWork}
                onClick={(num) => navigate(`/cities/${num}`)}
                reloadPage={() => {
                    setReloadPage(true)
                }}
            />
        }
        />
    );
};

export default CitiesList;