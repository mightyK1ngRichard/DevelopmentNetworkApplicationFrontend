import {FC} from "react";
import './TableView.css'

interface TableViewProps {
    data: {
        number: number;
        imageUrl: string;
        cityName: string;
        description: string;
    }[];
}

const TableView: FC<TableViewProps> = ({data}) => {
    const handleDelete = () => {

    }

    return (
        <table>
            <thead>
            <tr>
                <th className="number">Номер</th>
                <th>Фотография</th>
                <th>Название города</th>
                <th>Описание</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td className="city-number-td">{item.number}</td>
                    <td className="image-td">
                        <img src={item.imageUrl} alt={`City ${item.number}`}/>
                    </td>
                    <td className="city-name-td">{item.cityName}</td>
                    <td>{item.description}</td>
                    <td className="delete-td">
                        <img
                            className="delete-button-td"
                            src="/deleteTrash.png"
                            alt="Delete"
                            onClick={handleDelete}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableView;
