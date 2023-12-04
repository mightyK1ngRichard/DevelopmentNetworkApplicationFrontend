import {FC} from "react";
import './TableView.css'
import {IDestinationHikes} from "../../models/models.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {deleteHikeById} from "../../store/reducers/ActionCreator.ts";
import MyComponent from "../Popup/Popover.tsx";
import LoadAnimation from "../Popup/MyLoaderComponent.tsx";

interface TableViewProps {
    destHikes: IDestinationHikes[]
}

const TableView: FC<TableViewProps> = ({destHikes}) => {
    const dispatch = useAppDispatch()
    const {isLoading, error} = useAppSelector(state => state.hikeReducer)

    const handleDelete = (id: number) => {
        dispatch(deleteHikeById(id))
    }

    return (
        <>
            {isLoading && <LoadAnimation/>}
            {error != "" && <MyComponent isError={true} message={error}/>}
            {error === "" && <table>
                <thead>
                <tr>
                    <th className="number">Номер</th>
                    <th>Фотография</th>
                    <th>Название города</th>
                    <th>Описание</th>
                </tr>
                </thead>
                <tbody>
                {destHikes.map((item, index) => (
                    <tr key={index}>
                        <td className="city-number-td">{item.serial_number}</td>
                        <td className="image-td">
                            <img src={item.city.image_url} alt="photo"/>
                        </td>
                        <td className="city-name-td">{item.city.city_name}</td>
                        <td>{item.city.description}</td>
                        <td className="delete-td">
                            <img
                                className="delete-button-td"
                                src="/deleteTrash.png"
                                alt="Delete"
                                onClick={() => handleDelete(item.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>}
        </>
    );
};

export default TableView;
