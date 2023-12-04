import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cityReducer from "./reducers/CitySlice.ts"
import hikeReducer from "./reducers/HikeSlice.ts"

const rootReducer = combineReducers({
    cityReducer,
    hikeReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']