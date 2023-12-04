import {ICity} from "../../models/models.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CityState {
    cities: ICity[];
    city: ICity | null,
    isLoading: boolean;
    error: string;
}

const initialState: CityState = {
    cities: [],
    city: null,
    isLoading: false,
    error: '',
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        citiesFetching(state) {
            state.isLoading = true
            state.error = ''
        },
        citiesFetched(state, action: PayloadAction<ICity[]>) {
            state.isLoading = false
            state.error = ''
            state.cities = action.payload
        },
        citiesFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.cities = []
        },
        cityFetching(state) {
            state.isLoading = true
            state.error = ''
        },
        cityFetched(state, action: PayloadAction<ICity>) {
            state.isLoading = false
            state.error = ''
            state.city = action.payload
        },
        cityFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.cities = []
            state.city = null
        },
    },
})

export default citySlice.reducer;