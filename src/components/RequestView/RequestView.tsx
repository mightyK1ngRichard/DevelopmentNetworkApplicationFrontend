import {FC, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchHikes, fetchHikesFilter} from "../../store/reducers/ActionCreator.ts";
import MyComponent from "../Popup/Popover.tsx";
import {Link} from "react-router-dom";
import HikeCard from "./HikeCard.tsx";
import "./DatePickerStyles.css";
import './RequestView.css'

interface RequestViewProps {
    setPage: () => void;
}

const RequestView: FC<RequestViewProps> = ({setPage}) => {
    const dispatch = useAppDispatch();
    const {hike, error, success} = useAppSelector(
        (state) => state.hikeReducer
    );
    const {isAuth} = useAppSelector((state) => state.userReducer);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    useEffect(() => {
        setPage();
        dispatch(fetchHikes())

        const intervalId = setInterval(() => {
            handleFilter()
        }, 3000);

        return () => {
            clearInterval(intervalId)
        };
    }, [startDate, endDate, selectedStatus]);

    const handleFilter = () => {
        const formatDate = (date: Date | null | undefined): string | undefined => {
            if (!date) {
                return undefined;
            }
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        dispatch(fetchHikesFilter(formattedStartDate, formattedEndDate, `${selectedStatus}`))
    }

    if (!isAuth) {
        return (
            <Link to="/login" className="btn btn-outline-danger">
                Требуется войти в систему
            </Link>
        );
    }

    return (
        <>
            <div className="filter-section">
                <label>Дата создания с:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="custom-datepicker"
                    popperPlacement="bottom-start"
                />
                <label>Дата окончания по:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="custom-datepicker"
                    popperPlacement="bottom-start"
                />
                <label>Статус похода:</label>
                <select
                    value={selectedStatus || ""}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">Выберите статус</option>
                    <option value="1">Черновик</option>
                    <option value="2">Сформирован</option>
                    <option value="3">Завершён</option>
                    <option value="4">Отклонён</option>
                </select>
                <button onClick={handleFilter}>Применить фильтры</button>
            </div>
            {/* Content Section */}
            {/*{isLoading && <LoadAnimation/>}*/}
            {error !== "" && <MyComponent isError={true} message={error}/>}
            {success !== "" && <MyComponent isError={false} message={success}/>}
            {hike && hike.hikes.length === 0 && <h1>Заявок нет</h1>}
            {hike &&
                hike.hikes.map((singleHike, index) => (
                    <div key={index} className="card-block">
                        <HikeCard singleHike={singleHike}/>
                    </div>
                ))}
        </>
    );
};

export default RequestView;
