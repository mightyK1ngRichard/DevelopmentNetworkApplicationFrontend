import {useNavigate} from 'react-router-dom';
import {FC, useEffect, useState} from 'react';
import {ICity, mockCities} from "../../models/models.ts";
import List from "../List.tsx";
import CityItem from "../CityItem/CityItem.tsx";
import './CitiesList.css'

const CitiesList: FC = () => {
    const [cities, setCities] = useState<ICity[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [serverIsWork, setServerStatus] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCities().catch((err) => {
            console.error(err);
            if (searchValue) {
                const filteredCities = mockCities.filter(city =>
                    city.city_name?.toLowerCase().includes(searchValue.toLowerCase())
                );
                setCities(filteredCities);
            } else {
                setCities(mockCities);
            }
        });
    }, [searchValue, serverIsWork]);

    const fetchCities = async () => {
        try {
            const currentURL = window.location.href;
            const url = new URL(currentURL);
            let apiUrl = 'http://localhost:7070/api/v3/cities';

            if (url.searchParams.has('search')) {
                setSearchValue(url.searchParams.get('search') ?? '')
                apiUrl += `?search=${searchValue}`;
            }

            const response = await fetch(apiUrl, {
                method: "GET",
                signal: AbortSignal.timeout(1000)
            })

            if (!response.ok) {
                setServerStatus(false)
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setServerStatus(true)
            setCities(data.cities);
        } catch (e) {
            console.error(e);
            setServerStatus(false)
            throw e;
        }
    }

    return (
        <List items={cities} renderItem={(city: ICity) =>
            <CityItem city={city} isServer={serverIsWork} onClick={(num) => navigate(`/DevelopmentNetworkApplicationFrontend/cities/${num}`)}/>
        }
        />
    );
};

export default CitiesList;