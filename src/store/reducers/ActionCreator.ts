import {AppDispatch} from "../store.ts";
import axios from "axios";
import {
    ICityResponse,
    ICityWithBasket,
    IDeleteDestinationHike,
    IHikeResponse,
    IRequest,
    mockCities
} from "../../models/models.ts";
import {citySlice} from "./CitySlice.ts"
import {hikeSlice} from "./HikeSlice.ts";

const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE3MzU2NDYsImlhdCI6MTcwMTczMjA0NiwiaXNzIjoiYml0b3AtYWRtaW4iLCJ1c2VyX2lkIjoxMywiUm9sZSI6MH0.H4qbFhjuAOimD3mxR7I6V0Rxnom9QBvrW2Fh0U2hruQ`;

export const fetchCities = (searchValue?: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(citySlice.actions.citiesFetching())
        const response = await axios.get<ICityWithBasket>('/api/v3/cities' + `?search=${searchValue ?? ''}`)
        dispatch(citySlice.actions.citiesFetched(response.data.cities))
    } catch (e) {
        dispatch(citySlice.actions.citiesFetchedError(`Ошибка: ${e}`))
        dispatch(citySlice.actions.citiesFetched(filterMockData(searchValue)))
    }
}

export const addCityIntoHike = (cityId: number, serialNumber: number, cityName: string) => async (dispatch: AppDispatch) => {
    const config = {
        method: "post",
        url: "/api/v3/cities/add-city-into-hike",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            city_id: cityId,
            serial_number: serialNumber
        }
    }

    try {
        dispatch(citySlice.actions.citiesFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Город "${cityName}" добавлен`
        dispatch(citySlice.actions.cityAddedIntoHike([errorText, successText]));
        setTimeout(() => {
            dispatch(citySlice.actions.cityAddedIntoHike(['', '']));
        }, 6000);
    } catch (e) {
        dispatch(citySlice.actions.citiesFetchedError(`${e}`))
    }
}

export const makeHike = () => async (dispatch: AppDispatch) => {
    const config = {
        method: "put",
        url: "/api/v3/hikes/update/status-for-user",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            status_id: 2
        }
    }
    try {
        dispatch(hikeSlice.actions.hikesFetching())
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || `Заявка создана`
        dispatch(hikeSlice.actions.hikesUpdated([errorText, successText]));
        if (successText != "") {
            dispatch(fetchHikes())
        }
        setTimeout(() => {
            dispatch(hikeSlice.actions.hikesUpdated(['', '']));
        }, 6000);
    } catch (e) {
        dispatch(hikeSlice.actions.hikesDeleteError(`${e}`))
    }
}


export const fetchHikes = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(hikeSlice.actions.hikesFetching())
        const response = await axios.get<IHikeResponse>(`/api/v3/hikes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const transformedResponse: IRequest = {
            hikes: response.data.hikes,
            status: response.data.status
        };

        dispatch(hikeSlice.actions.hikesFetched(transformedResponse))
    } catch (e) {
        dispatch(hikeSlice.actions.hikesFetchedError(`${e}`))
    }
}

export const deleteHikeById = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(hikeSlice.actions.hikesFetching())
        const response = await axios.delete<IDeleteDestinationHike>(`/api/v3/destination-hikes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                id: id,
            },
        });
        dispatch(hikeSlice.actions.hikesDeleteSuccess(response.data))
        dispatch(fetchHikes())
    } catch (e) {
        dispatch(hikeSlice.actions.hikesFetchedError(`${e}`))
    }
}

export const updateHike = (
    id: number,
    description: string,
    hikeName: string,
    startDate: string,
    endDate: string,
    leader: string
) => async (dispatch: AppDispatch) => {
    const config = {
        method: "put",
        url: "/api/v3/hikes",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: "application/json"
        },
        data: {
            description: description,
            hike_name: hikeName,
            date_start_hike: convertInputFormatToServerDate(startDate),
            date_end: convertInputFormatToServerDate(endDate),
            leader: leader,
            id: id,
        }
    };

    try {
        const response = await axios(config);
        const errorText = response.data.description ?? ""
        const successText = errorText || "Успешно обновленно"
        dispatch(hikeSlice.actions.hikesUpdated([errorText, successText]));
        setTimeout(() => {
            dispatch(hikeSlice.actions.hikesUpdated(['', '']));
        }, 5000);
    } catch (e) {
        dispatch(hikeSlice.actions.hikesFetchedError(`${e}`));
    }
}

export const fetchCity = (
    cityId: string,
    setPage: (name: string, id: number) => void
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(citySlice.actions.citiesFetching())
        const response = await axios.get<ICityResponse>(`/api/v3/cities?city=${cityId}`)
        const city = response.data.city
        setPage(city.city_name ?? "Без названия", city.id)
        dispatch(citySlice.actions.cityFetched(city))
    } catch (e) {
        console.log(`Ошибка загрузки городов: ${e}`)
        const previewID = cityId !== undefined ? parseInt(cityId, 10) - 1 : 0;
        const mockCity = mockCities[previewID]
        setPage(mockCity.city_name ?? "Без названия", mockCity.id)
        dispatch(citySlice.actions.cityFetched(mockCity))
    }
}

// MARK: - Mock data

function filterMockData(searchValue?: string) {
    if (searchValue) {
        const filteredCities = mockCities.filter(city =>
            city.city_name?.toLowerCase().includes((searchValue ?? '').toLowerCase())
        );
        if (filteredCities.length === 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById('search-text-field').value = ""
            alert("Данных нету")

        }
        return filteredCities
    }
    return mockCities
}

export function DateFormat(dateString: string) {
    if (dateString == "0001-01-01T00:00:00Z") {
        return "Дата не указана"
    }
    const date = new Date(dateString);
    return `${date.getDate()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`
}

export function emptyString(text: string, emptyText: string) {
    return text == "" ? emptyText : text
}

export const convertServerDateToInputFormat = (serverDate: string) => {
    const dateObject = new Date(serverDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

function convertInputFormatToServerDate(dateString: string): string {
    const dateRegex = /^4-2-2T2:2:2Z2:2/;
    if (dateRegex.test(dateString)) {
        return dateString;
    } else {
        const date = new Date(dateString);
        const isoDate = date.toISOString();
        return isoDate;
    }
}