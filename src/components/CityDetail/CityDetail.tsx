import {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ICity, mockCities} from '../../models/models.ts';
import './CityCard.css'

const CityDetail: FC = () => {
    const params = useParams();
    const [city, setCity] = useState<ICity | null>(null);
    const handleDelete = () => {
        console.log(`Tap! ${city?.id}`)
        // TODO: Удаление
    }

    useEffect(() => {
        fetchCity().catch((err) => {
            console.error(err);
            const previewID = params.id !== undefined ? parseInt(params.id, 10) - 1 : 0;
            setCity(mockCities[previewID]);
        });
    }, [params.id]);

    async function fetchCity() {
        try {
            const response = await fetch(`http://localhost:7070/api/v3/cities?city=${params.id}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCity(data.city);
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
