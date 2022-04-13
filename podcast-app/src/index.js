import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import {createStore} from 'redux'
import {Provider} from "react-redux";
import userReducer from "./reducers/user-reducer.js";


const store = createStore(userReducer);


const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
    rootElement
);
