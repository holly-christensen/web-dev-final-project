// import './vendors/bootstrap/css/bootstrap.min.css';
// import './vendors/bootstrap/bootstrap.min.css';
// import './vendors/fontawesome/css/all.min.css';

import './App.css';
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

// import {ProfileProvider} from "./contexts/profile-context";
// import SecureRoute from "./components/secure-route";

function App() {
    return (
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
    );
}

export default App;