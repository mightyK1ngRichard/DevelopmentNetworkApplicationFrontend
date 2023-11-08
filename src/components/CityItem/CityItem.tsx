import {FC} from 'react';
import {ICity} from '../../models/models.ts';
import './CardItem.css'

interface CityItemProps {
    city: ICity;
    onClick: (num: number) => void,
    isServer: boolean
}

const CityItem: FC<CityItemProps> = ({city, onClick, isServer}) => {
    const deleteClickHandler = () => {
        DeleteData()
            .then(() => {
                console.log(`City with ID ${city.id} successfully deleted.`);
            })
            .catch(error => {
                console.error(`Failed to delete city with ID ${city.id}: ${error}`);
            });
    }

    const DeleteData = async () => {
        try {
            const response = await fetch('http://localhost:7070/api/v3/cities/delete/'+city.id, {
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


    return (
        <div className="card" data-city-id={city.id}>
            <img
                src={city.image_url}
                alt="Image"
                className="photo"
                onClick={() => onClick(city.id)}
                id={`photo-${city.id}`}
            />
            {isServer && (
                <div className="circle" onClick={deleteClickHandler}>
                    <img
                        src="http://localhost:9000/vikings-server/deleteTrash.png"
                        alt="Del"
                        className="deleted-trash"
                    />
                </div>
            )}
            <div className="container-card" onClick={() => onClick(city.id)}>{city.city_name}</div>
        </div>
    );
};

export default CityItem;
