import React from "react";
import ReactDOM from 'react-dom';
import { ContextProvider} from './contexts/ContextProvider';


import './index.css';
import App from './App';
import { LoginContextProvider } from "./contexts/LoginContextProvider";


ReactDOM.render(
<LoginContextProvider>
<ContextProvider>
<App />
</ContextProvider>
</LoginContextProvider>
, document.getElementById('root'));