import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";
import Loading from './view/common/common-components/Loading.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loading />
    <App />
  </StrictMode>,
)
