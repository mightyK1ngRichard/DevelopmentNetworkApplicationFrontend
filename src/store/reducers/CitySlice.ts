import {ICity} from "../../models/models.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CityState {
    cities: ICity[];
    city: ICity | null,
    isLoading: boolean;
    error: string;
    success: string;
    serialNumber: number;
}

const initialState: CityState = {
    cities: [],
    city: null,
    isLoading: false,
    error: '',
    success: '',
    serialNumber: 0
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        increase(state) {
            state.serialNumber += 1
        },
        minus(state) {
            state.serialNumber = state.serialNumber == 0 ? 0 :  state.serialNumber - 1
        },
        reset(state) {
            state.serialNumber += 0
        },
        citiesFetching(state) {
            state.isLoading = true
            state.error = ''
            state.success = ''
        },
        citiesFetched(state, action: PayloadAction<ICity[]>) {
            state.isLoading = false
            state.cities = action.payload
        },
        citiesFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.success = ''
        },
        cityAddedIntoHike(state, action: PayloadAction<string[]>) {
            state.isLoading = false
            state.error = action.payload[0]
            state.success = action.payload[1]
        },
        cityFetching(state) {
            state.isLoading = true
            state.error = ''
            state.success = ''
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