import logo from './logo.svg';
import './App.css';
import CommentList from "./CommentList"
import UserSignUp from "./UserSignUp";
import {useGetPodcasts} from "./useRequest";
import CreatorSignUp from "./CreatorSignUp";
import {ProfileProvider} from "./contexts/profile-context";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Signin from "./screens/signin";
import Signup from "./screens/signup";


function App() {
    // const {isSuccess, isError, error, data, isLoading} = useGetPodcasts();
    //
    //  if (isError) return <h1>{error}</h1>;
    //  if (isLoading) return <h1>Loading...</h1>;
    //
    //  let podcasts = []
    //  if (isSuccess) {
    //      podcasts = data.podcasts.data;
    //  }

    return (
        // <>
        //     <div className="App">
        //         <h1>Popular Podcasts</h1>
        //         {/*<ul>*/}
        //         {/*{podcasts.map((podcast) =>*/}
        //         {/*    <li key={podcast.id}>*/}
        //         {/*        {podcast.title}*/}
        //         {/*    </li>)}*/}
        //         {/*</ul>*/}
        //     </div>
        //     <CommentList/>
        //     <UserSignUp/>
        //     <CreatorSignUp/>
        // </>
        <ProfileProvider>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/">
                            {/*<Route path="/profile" element={*/}
                            {/*    <SecureRoute>*/}
                            {/*        <Profile/>*/}
                            {/*    </SecureRoute>*/}
                            {/*}/>*/}
                            <Route path="/signin" element={<Signin/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            {/*<Route path="/omdb" element={<SearchOmdb/>}/>*/}
                            {/*<Route path="omdb/:searchString" element={<SearchOmdb/>}/>*/}
                            {/*<Route path="omdb/details/:imdbID" element={<DetailsOmdb/>}/>*/}
                            {/*<Route path="users"*/}
                            {/*       element={<UserList/>}/>*/}
                            {/*<Route path="labs"*/}
                            {/*       element={<Labs/>}/>*/}
                            {/*<Route path="hello"*/}
                            {/*       element={<HelloWorld/>}/>*/}
                            {/*<Route path="tuiter"*/}
                            {/*       element={<Tuiter/>}>*/}
                            {/*    <Route index path="home"*/}
                            {/*           element={<HomeScreen/>}/>*/}
                            {/*    <Route path="explore"*/}
                            {/*           element={<ExploreScreen/>}/>*/}
                            {/*    <Route path="notifications"*/}
                            {/*           element={<NotificationScreen/>}/>*/}
                            {/*</Route>*/}
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ProfileProvider>
    );
}

export default App;
