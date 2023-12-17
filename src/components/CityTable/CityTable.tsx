import CityTableCell from './CityTableCell';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {FC, useEffect} from "react";
import {fetchCities} from "../../store/reducers/ActionCreator.ts";
import LoadAnimation from "../Popup/MyLoaderComponent.tsx";
import MyComponent from "../Popup/Popover.tsx";
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import './CityTable.css'

interface CityTableProps {
    setPage: () => void
}

const CityTable: FC<CityTableProps> = ({setPage}) => {
    const dispatch = useAppDispatch()
    const {cities, isLoading, error, success} = useAppSelector(state => state.cityReducer)
    useEffect(() => {
        setPage()
        dispatch(fetchCities())
    }, []);

    return (
        <>
            {isLoading && <LoadAnimation/>}
            {error != "" && <MyComponent isError={true} message={error}/>}
            {success != "" && <MyComponent isError={false} message={success}/>}

            <Nav className="ms-2">
                <Nav.Item>
                    <Link to="/add-city-2" className="btn btn-outline-primary mt-2"
                          style={{marginLeft: '80px', marginBottom: '30px'}}>
                        Добавить город
                    </Link>
                </Nav.Item>
            </Nav>
            <table>
                <tbody>
                {cities.map(city => (
                    <tr key={city.id}>
                        <td>{city.id}</td>
                        <td>
                            <CityTableCell
                                cityData={city}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default CityTable;
