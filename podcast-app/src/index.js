import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import {combineReducers, createStore} from 'redux'
import {Provider} from "react-redux";
import users from "./reducers/user-reducer";
import comments from "./reducers/comment-reducer";


const reducers = combineReducers({users, comments})
const store = createStore(reducers);


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
