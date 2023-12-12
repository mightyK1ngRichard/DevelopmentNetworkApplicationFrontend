import {Table} from 'react-bootstrap';
import CityTableCell from './CityTableCell';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {useEffect} from "react";
import {fetchCities} from "../../store/reducers/ActionCreator.ts";
import LoadAnimation from "../Popup/MyLoaderComponent.tsx";
import MyComponent from "../Popup/Popover.tsx";
import './CityTable.css'
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const CityTable = () => {
    const dispatch = useAppDispatch()
    const {cities, isLoading, error, success} = useAppSelector(state => state.cityReducer)
    useEffect(() => {
        dispatch(fetchCities())
    }, []);

    return (
        <>
            {isLoading && <LoadAnimation/>}
            {error != "" && <MyComponent isError={true} message={error}/>}
            {success != "" && <MyComponent isError={false} message={success}/>}

            <Nav className="ms-2">
                <Nav.Item>
                    <Link to="/add-city" className="btn btn-outline-primary"
                          style={{marginLeft: '80px', marginBottom: '30px'}}>
                        Добавить город
                    </Link>
                </Nav.Item>
            </Nav>
            <Table striped bordered hover className='table table-dark table-sm'>
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
            </Table>
        </>
    );
};

export default CityTable;
