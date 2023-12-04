import './RequestView.css';
import {FC, useEffect, useState} from "react";
import TableView from "../TableView/TableView.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    convertServerDateToInputFormat,
    emptyString,
    fetchHikes, makeHike,
    updateHike
} from "../../store/reducers/ActionCreator.ts";
import {IHike} from "../../models/models.ts";
import MyComponent from "../Popup/Popover.tsx";
import LoadAnimation from "../Popup/MyLoaderComponent.tsx";

interface RequestViewProps {
    setPage: () => void;
}

const RequestView: FC<RequestViewProps> = ({setPage}) => {
    const dispatch = useAppDispatch();
    const {hike, isLoading, error, success} = useAppSelector(state => state.hikeReducer);
    const [startHikeDate, setStartHikeDate] = useState('');
    const [endHikeDate, setEndHikeDate] = useState('');
    const [leader, setLeader] = useState('$');
    const [description, setDescription] = useState('$');
    const [hikeName, setHikeName] = useState('$');

    useEffect(() => {
        setPage();
        dispatch(fetchHikes());
    }, []);

    const handleMakeRequest = () => {
        dispatch(makeHike())
    }

    const handleSave = (id: number, hike: IHike) => {
        dispatch(
            updateHike(
                id,
                description == '$' ? hike.description : description,
                hikeName == '$' ? hike.hike_name : hikeName,
                startHikeDate == "" ? hike.date_start_hike : startHikeDate,
                endHikeDate == "" ? hike.date_end : endHikeDate,
                leader == '$' ? hike.leader : leader
            )
        )
    }

    return (
        <>
            {isLoading && <LoadAnimation/>}
            {error != "" && <MyComponent isError={true} message={error}/>}
            {success != "" && <MyComponent isError={false} message={success}/>}
            {hike && hike.hikes.length == 0 && <h1>Заявок нет</h1>}
            {hike &&
                hike.hikes.map((singleHike, index) => (
                    <div key={index} className='card-block'>
                        <div className="card">
                            <h3>Статус: {singleHike.status.status_name}</h3>
                            <div className="info">
                                <div className="author-info">
                                    <img src={singleHike.user.image_url} alt="Фото Автора" className="author-img"/>
                                    <div>
                                        <h4>{emptyString(singleHike.user.user_name, "Имя не задано")}</h4>
                                        <p>Профессия: {emptyString(singleHike.user.profession, 'Профессия не задана')}</p>
                                        <p>@{emptyString(singleHike.user.login, 'Логин на задан')}</p>
                                    </div>
                                </div>

                                <div className="dates-info">
                                    <p>
                                        Начало похода:
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={startHikeDate || convertServerDateToInputFormat(singleHike.date_start_hike)}
                                            onChange={(e) => setStartHikeDate(e.target.value)}
                                            disabled={singleHike.status_id == 2}
                                        />
                                    </p>
                                    <p>
                                        Конец похода:
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={endHikeDate || convertServerDateToInputFormat(singleHike.date_end)}
                                            onChange={(e) => setEndHikeDate(e.target.value)}
                                            disabled={singleHike.status_id == 2}
                                        />
                                    </p>
                                    <p>
                                        Лидер похода:
                                        <input
                                            type="text"
                                            className="form-control bg-black text-white"
                                            value={leader == "$" ? singleHike.leader : leader}
                                            onChange={(e) => setLeader(e.target.value)}
                                            disabled={singleHike.status_id == 2}
                                        />
                                    </p>
                                </div>

                            </div>
                            <div className="detail-info">
                                <input
                                    type="text"
                                    className="form-control bg-black text-white"
                                    value={hikeName == "$" ? singleHike.hike_name : hikeName}
                                    onChange={(e) => setHikeName(e.target.value)}
                                    style={{marginBottom: '20px'}}
                                    disabled={singleHike.status_id == 2}
                                />
                                <textarea
                                    className="form-control description-text-info bg-black text-white"
                                    style={{height: "200px"}}
                                    value={description == "$" ? singleHike.description : description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={singleHike.status_id == 2}
                                ></textarea>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                {singleHike.status_id != 2 && <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={() => handleSave(singleHike.id, singleHike)}
                                    style={{width: '150px', marginTop: '15px'}}
                                >
                                    Сохранить
                                </button>}
                            </div>
                        </div>
                        <TableView destHikes={singleHike.destination_hikes} status={singleHike.status_id}/>
                        {
                            singleHike.status_id != 2 &&
                            <div style={{textAlign: 'right'}}>
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={handleMakeRequest}
                                    style={{width: '150px', marginTop: '25px', marginRight: '80px'}}
                                >
                                    Сохранить
                                </button>
                            </div>
                        }
                    </div>
                ))}
        </>
    );
};

export default RequestView;