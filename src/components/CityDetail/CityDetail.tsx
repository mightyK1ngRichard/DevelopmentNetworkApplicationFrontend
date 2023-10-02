import {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {ICity, ICityResponse, mockCities} from '../../models/models.ts';
import './CityCard.css'

const CityDetail: FC = () => {
    const params = useParams();
    const [city, setCity] = useState<ICity | null>(null);
    const handleDelete = () => {
        console.log(`Tap! ${city?.id}`)
        // TODO: Удаление
    }

    useEffect(() => {
        fetchCity().then().catch((err) => {
            console.error(err);
            // Если ошибка, подгружаем моки.
            const previewID: number = params.id - 1
            setCity(mockCities[previewID])
        });
    }, [params.id]);

    async function fetchCity() {
        try {
            const response = await axios.get<ICityResponse>(
                `http://localhost:7070/api/v3/cities?city=${params.id}`
            );
            setCity(response.data.city);

        } catch (error) {
            console.error('Error fetching city data', error);
            throw error;
        }
    }

    if (!city) {
        return <div>Loading...</div>;
    }

    return (
        !city
            ? <div>Loading...</div>
            : <div className="city-card-body">
                <div className="card-container">
                    <span className="pro">Город</span>
                    <img
                        className="round"
                        src={city?.image_url}
                        alt={city?.city_name}
                    />
                    <h3>{city?.city_name}</h3>
                    <h6>Статус: {city?.status.status_name}</h6>
                    <p>{city?.description}</p>
                    <img
                        className="delete-button"
                        src="http://localhost:7070/static/img/deleteTrash.png"
                        alt="Delete"
                        onClick={handleDelete}
                    />
                    <div className="buttons">
                        <button className="primary">Следить</button>
                        <button className="primary ghost">Записаться</button>
                    </div>
                </div>
            </div>
    );
};

export default CityDetail;
