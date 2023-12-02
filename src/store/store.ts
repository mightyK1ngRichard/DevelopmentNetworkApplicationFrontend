import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cityReducer from "./reducers/CitySlice.ts"

const rootReducer = combineReducers({
    cityReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']