import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CitiesList from "./components/CitiesList/CitiesList.tsx";
import CityDetail from "./components/CityDetail/CityDetail.tsx";

const router = createBrowserRouter([
    {
        path: '/cities',
        element: <CitiesList/>
    },
    {
        path: '/cities/:id',
        element: <CityDetail/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
