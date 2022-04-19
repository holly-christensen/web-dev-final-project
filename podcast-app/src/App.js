import logo from './logo.svg';
import './App.css';
import UsersList from "./UserList"
import UserSignUp from "./UserSignUp";
import {useGetPodcasts} from "./useRequest";


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
        <>
            <div className="App">
                <h1>Popular Podcasts</h1>
                {/*<ul>*/}
                {/*{podcasts.map((podcast) =>*/}
                {/*    <li key={podcast.id}>*/}
                {/*        {podcast.title}*/}
                {/*    </li>)}*/}
                {/*</ul>*/}
            </div>
            {/*<UsersList/>*/}
            <UserSignUp/>
        </>
    );
}

export default App;
