import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import {combineReducers, createStore} from 'redux'
import {Provider} from "react-redux";
import usersReducer from "./reducers/user-reducer";
import commentsReducer from "./reducers/comment-reducer";
import creatorsReducer from "./reducers/creator-reducer";
import reviewsReducer from "./reducers/review-reducer";
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/vendors/bootstrap.min.css';

const store = createStore(combineReducers({
        users: usersReducer,
        comments: commentsReducer,
        creators: creatorsReducer,
        reviews: reviewsReducer
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
