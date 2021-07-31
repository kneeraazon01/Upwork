import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MoralisProvider } from './context/MoralisContext';

ReactDOM.render(
    <React.StrictMode>
        <MoralisProvider>
            <App />
        </MoralisProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
