import './RequestView.css';
import {FC, useEffect, useState} from "react";
import TableView from "../TableView/TableView.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {convertServerDateToInputFormat, emptyString, fetchHikes} from "../../store/reducers/ActionCreator.ts";

interface RequestViewProps {
    setPage: () => void;
}

const RequestView: FC<RequestViewProps> = ({setPage}) => {
    const dispatch = useAppDispatch();
    const {hike, isLoading, error} = useAppSelector(state => state.hikeReducer);

    const [startHikeDate, setStartHikeDate] = useState('');
    const [endHikeDate, setEndHikeDate] = useState('');
    const [leader, setLeader] = useState('$');
    const [description, setDescription] = useState('$');
    const [hikeName, setHikeName] = useState('$');


    useEffect(() => {
        setPage();
        dispatch(fetchHikes());
    }, []);

    const handleSave = () => {

    }

    return (
        <>
            {isLoading && <h1> Загрузка данных .... </h1>}
            {error !== "" && <h1> {error} </h1>}
            {hike &&
                hike.hikes.map((singleHike, index) => (
                    <div key={index} className='card-block'>
                        <div className="card">
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
                                        />
                                    </p>
                                    <p>
                                        Конец похода:
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={endHikeDate || convertServerDateToInputFormat(singleHike.date_end)}
                                            onChange={(e) => setEndHikeDate(e.target.value)}
                                        />
                                    </p>
                                    <p>
                                        Лидер похода:
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={leader == "$" ? singleHike.leader : leader}
                                            onChange={(e) => setLeader(e.target.value)}
                                        />
                                    </p>
                                </div>

                            </div>
                            <div className="detail-info">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={hikeName == "$" ? singleHike.hike_name : hikeName}
                                    onChange={(e) => setHikeName(e.target.value)}
                                    style={{ marginBottom: '20px' }}
                                />
                                <textarea
                                    className="form-control description-text-info dark-theme"
                                    style={{height: "200px"}}
                                    value={ description == "$" ? singleHike.description : description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={handleSave}
                                    style={{ width: '150px', marginTop: '15px' }}
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                        <TableView destHikes={singleHike.destination_hikes}/>
                    </div>
                ))}
        </>
    );
};

export default RequestView;