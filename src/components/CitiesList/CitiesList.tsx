import {FC, useEffect, useState} from 'react';
import {ICities, ICity, mockCities} from "../../models/models.ts";
import axios from "axios";
import List from "../List.tsx";
import CityItem from "../CityItem/CityItem.tsx";
import './CitiesList.css'

const CitiesList: FC = () => {

    const [cities, setCities] = useState<ICity[]>([]);

    useEffect(() => {
        fetchCities().then().catch((err) => {
            console.error(err);
            // Если ошибка, подгружаем моки.
            setCities(mockCities)
        });
    }, []);

    async function fetchCities() {
        try {
            const response = await axios.get<ICities>('http://localhost:7070/api/v3/cities');
            setCities(response.data.cities);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    return (
        <div className="card-grid">
            <List items={cities} renderItem={(city: ICity) =>
                <CityItem city={city} onClick={(num) => {
                    window.location.href = `http://localhost:5173/cities/${num}`
                }}
                />
            }
            />
        </div>
    );
};

export default CitiesList;