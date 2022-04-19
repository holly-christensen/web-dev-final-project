import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import {combineReducers, createStore} from 'redux'
import {Provider} from "react-redux";
import usersReducer from "./reducers/user-reducer";
import commentsReducer from "./reducers/comment-reducer";


const store = createStore(combineReducers({
        users: usersReducer,
        comments: commentsReducer
    })
);


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
