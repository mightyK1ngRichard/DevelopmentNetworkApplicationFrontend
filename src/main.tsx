import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './assets/styles/global.css'
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
        <App/>
    </BrowserRouter>,
);
