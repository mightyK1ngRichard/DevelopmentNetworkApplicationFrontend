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

const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE3MTUzNDQsImlhdCI6MTcwMTcxMTc0NCwiaXNzIjoiYml0b3AtYWRtaW4iLCJ1c2VyX2lkIjoxMywiUm9sZSI6MH0.nMGYm4iW4ioZ9IwDozjovXBl1cy8oYr_FMTV-tXAfV8`;

export const fetchCities = (searchValue?: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(citySlice.actions.citiesFetching())
        const response = await axios.get<ICityWithBasket>('/api/v3/cities' + `?search=${searchValue ?? ''}`)
        dispatch(citySlice.actions.citiesFetched(response.data.cities))
    } catch (e) {
        console.log(`Ошибка загрузки городов: ${e}`)
        dispatch(citySlice.actions.citiesFetched(filterMockData(searchValue)))
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
            hikes: response.data.hikes || [response.data.hike!],
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