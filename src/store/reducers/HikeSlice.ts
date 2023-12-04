import {IDeleteDestinationHike, IRequest} from "../../models/models.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HikeState {
    hike: IRequest | null;
    isLoading: boolean;
    error: string;
}

const initialState: HikeState = {
    hike: null,
    isLoading: false,
    error: '',
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