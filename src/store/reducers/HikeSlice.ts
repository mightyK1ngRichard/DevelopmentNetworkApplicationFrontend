import {IDeleteDestinationHike, IRequest} from "../../models/models.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HikeState {
    hike: IRequest | null;
    isLoading: boolean;
    error: string;
    success: string;
}

const initialState: HikeState = {
    hike: null,
    isLoading: false,
    error: '',
    success: ''
}

export const hikeSlice = createSlice({
    name: 'hike',
    initialState,
    reducers: {
        hikesFetching(state) {
            state.isLoading = true
            state.error = ''
        },
        hikesFetched(state, action: PayloadAction<IRequest>) {
            state.isLoading = false
            state.error = ''
            state.hike = action.payload
        },
        hikesDeleteSuccess(state, action: PayloadAction<IDeleteDestinationHike>) {
            state.isLoading = false
            state.error = action.payload.description ?? ""
        },
        hikesUpdated(state, action: PayloadAction<string[]>) {
            state.isLoading = false
            state.error = action.payload[0]
            state.success = action.payload[1]
        },
        hikesDeleteError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        hikesFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.hike = null
        },
    },
})

export default hikeSlice.reducer;