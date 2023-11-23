import {FC, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ICity, mockCities} from '../../models/models.ts';
import './CityCard.css'

interface CityDetailProps {
    setPage: (name: string, id: number) => void
}

const CityDetail: FC<CityDetailProps> = ({setPage}) => {
    const params = useParams();
    const [city, setCity] = useState<ICity | null>(null);
    const navigate = useNavigate();

    const handleDelete = () => {
        navigate('/cities');
        DeleteData()
            .then(() => {
                console.log(`City with ID ${city?.id} successfully deleted.`);
            })
            .catch(error => {
                console.error(`Failed to delete city with ID ${city?.id}: ${error}`);
                navigate('/cities');
            });
    }

    const DeleteData = async () => {
        try {
            const response = await fetch('http://localhost:7070/api/v3/cities/delete/' + city?.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Город успешно удален');
                window.location.reload();
            } else {
                console.error('Произошла ошибка при удалении города');
            }

        } catch (error) {
            console.error('Произошла ошибка сети', error);
        }
    }

    const BackHandler = () => {
        navigate('/cities');
    }

    useEffect(() => {
        fetchCity()
            .catch((err) => {
                console.error(err);
                const previewID = params.id !== undefined ? parseInt(params.id, 10) - 1 : 0;
                const mockCity = mockCities[previewID]
                setPage(mockCity.city_name ?? "Без названия", mockCity.id)
                setCity(mockCity);
            });

    }, [params.id]);

    async function fetchCity() {
        try {
            const response = await fetch(`http://localhost:7070/api/v3/cities?city=${params.id}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPage(data.city?.city_name ?? "Без названия", data.city.id)
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
                        src="/deleteTrash.png"
                        alt="Delete"
                        onClick={handleDelete}
                    />
                    <div className="buttons">
                        <button className="primary" onClick={BackHandler}>Назад</button>
                        <button className="primary ghost">Записаться</button>
                    </div>
                </div>
            </div>
    );
};

export default CityDetail;
