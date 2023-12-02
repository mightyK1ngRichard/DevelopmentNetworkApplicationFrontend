import {AppDispatch} from "../store.ts";
import axios from "axios";
import {ICityResponse, ICityWithBasket, mockCities} from "../../models/models.ts";
import {citySlice} from "./CitySlice.ts"

export const fetchCities = (searchValue?: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(citySlice.actions.citiesFetching())
        const response = await axios.get<ICityWithBasket>('http://localhost:7070/api/v3/cities' + `?search=${searchValue ?? ''}`)
        dispatch(citySlice.actions.citiesFetched(response.data.cities))
    } catch (e) {
        console.log(`Ошибка загрузки городов: ${e}`)
        dispatch(citySlice.actions.citiesFetched(filterMockData(searchValue)))
    }
}

export const fetchCity = (
    cityId: string,
    setPage: (name: string, id: number) => void
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(citySlice.actions.citiesFetching())
        const response = await axios.get<ICityResponse>(`http://localhost:7070/api/v3/cities?city=${cityId}`)
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
