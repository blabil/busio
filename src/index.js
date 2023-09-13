import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider} from './contexts/ContextProvider';
import { LoginContextProvider } from './contexts/LoginContextProvider';


ReactDOM.render(
<LoginContextProvider>
<ContextProvider>
<App />
</ContextProvider>
</LoginContextProvider>
, document.getElementById('root'));