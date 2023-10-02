import {FC} from 'react';
import {ICity} from '../../models/models.ts';
import './CardItem.css'

interface CityItemProps {
    city: ICity;
    onClick: (num: number) => void,
}

const CityItem: FC<CityItemProps> = ({city, onClick}) => {
    const deleteClickHandler = () => {
        console.log(`tap ${city.id}`)
    }

    return (
        <div className="card" data-city-id={city.id} onClick={() => onClick(city.id)}>
            <img src={city.image_url} alt="Image" className="photo" id={`photo-${city.id}`}/>
            <div className="circle" onClick={deleteClickHandler}>
                <img src="http://localhost:7070/static/img/deleteTrash.png" alt="Deleted" className="deleted-trash"/>
            </div>
            <div className="container-card">
                {city.city_name}
            </div>
        </div>
    );
};

export default CityItem;
