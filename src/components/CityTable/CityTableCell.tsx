import React, {FC, useState} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import {ICity} from "../../models/models.ts";
import {deleteCity, updateCityImage, updateCityInfo} from "../../store/reducers/ActionCreator.ts";
import {useAppDispatch} from "../../hooks/redux.ts";

interface CityTableCellProps {
    cityData: ICity
}

const CityTableCell: FC<CityTableCellProps> = ({cityData}) => {
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(cityData.city_name ?? "");
    const [description, setDescription] = useState(cityData.description ?? "");
    const [status, setStatus] = useState(cityData.status.status_name);
    const [statusId, setStatusId] = useState(`${cityData.status.id}`);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleDeleteClick = () => {
        dispatch(deleteCity(cityData.id))
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(updateCityInfo(cityData.id, name, description, statusId))
        if (imageFile) {
            dispatch(updateCityImage(cityData.id, imageFile))
        }
        setIsEditing(false);
    };

    const handleInputChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setDescription(value)
    }

    const handleInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setName(value)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {value} = e.target;
        setStatus(value)
        setStatusId(value)
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    return (
        <div>
            {isEditing ? (
                <Form>
                    <Form.Group as={Col} controlId="formCityName">
                        <Form.Label>Название города</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название города"
                            name="name"
                            value={name}
                            onChange={handleInputChangeName}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formCityStatus">
                        <Form.Label>Статус</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={status}
                            onChange={handleInputChange}
                        >
                            <option value="1">Существует</option>
                            <option value="2">Уничтожен</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formCityDescription">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Введите описание города"
                            name="description"
                            value={description}
                            onChange={handleInputChangeDescription}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCityImage">
                        <Form.Label>Картинка</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSaveClick}>
                        Сохранить изменения
                    </Button>
                </Form>
            ) : (
                <>
                    <div>
                        <p>Название города: {cityData.city_name}</p>
                        <p>Статус: {cityData.status.status_name}</p>
                        <p>Описание: {cityData.description}</p>
                        {cityData.image_url &&
                            <img src={cityData.image_url}
                                 alt="City Image"
                                 className="img-thumbnail"
                                 style={{width: '200px'}}/>
                        }
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outline-warning" onClick={handleEditClick}>
                            Редактировать
                        </Button>

                        <div style={{ margin: '0 20px' }}></div>

                        <Button variant="outline-danger" onClick={handleDeleteClick}>
                            Удалить
                        </Button>
                    </div>

                </>
            )}
        </div>
    );
};

export default CityTableCell;
