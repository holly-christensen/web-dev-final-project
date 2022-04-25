// import './vendors/bootstrap/css/bootstrap.min.css';
// import './vendors/bootstrap/bootstrap.min.css';
// import './vendors/fontawesome/css/all.min.css';

import './App.css';
<<<<<<< HEAD
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserProfile from "./components/UserProfile";
import CreatorProfile from "./components/CreatorProfile";
import EpisodeDetails from "./components/EpisodeDetails";
import Homepage from "./components/Homepage";
import PodcastDetails from "./components/PodcastDetails";
import Search from "./components/Search";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Nav from "./components/Nav";
=======
import CommentList from "./CommentList"
import UserSignUp from "./UserSignUp";
import {useGetPodcasts} from "./useRequest";
import CreatorSignUp from "./CreatorSignUp";
import {ProfileProvider} from "./contexts/profile-context";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import SecureRoute from "./components/secure-route";
import Profile from "./profile";
>>>>>>> access the profile of a logged in user attempt - some state error

// import {ProfileProvider} from "./contexts/profile-context";
// import SecureRoute from "./components/secure-route";

function App() {
    return (
<<<<<<< HEAD
        // <ProfileProvider>
        <BrowserRouter>
            <Nav/>
            <div className="container">
                <Routes>
                    <Route path="/">
                        <Route path="/home" element={<Homepage/>}/>
                        <Route path="/profile" element={
                            // <SecureRoute>
                            <UserProfile/>
                            // </SecureRoute>
                        }/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/signout" element={<SignOut/>}/>
                        <Route path="/podcasts" element={<Search/>}/>
                        <Route path="podcasts/:searchString" element={<Search/>}/>
                        <Route path="podcasts/details/:pid" element={<PodcastDetails/>}/>
                        <Route path="podcasts/details/:pid/:eid" element={<EpisodeDetails/>}/>
                        <Route path="podcasts/details/:pid/creator/:cid" element={
                            // <SecureRoute>
                            <CreatorProfile/>
                            // </SecureRoute>
                        }/>
                    </Route>
                </Routes>

            </div>
        </BrowserRouter>
        // </ProfileProvider>
=======
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
                            <Route path="/profile" element={
                                <SecureRoute>
                                    <Profile/>
                                </SecureRoute>
                            }/>
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
>>>>>>> access the profile of a logged in user attempt - some state error
    );
}

export default App;