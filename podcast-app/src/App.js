import logo from './logo.svg';
import './App.css';
import {useGetPodcasts} from "./useRequest";


function App() {
    console.log(useGetPodcasts());
    const {isSuccess, isError, error, data, isLoading} = useGetPodcasts();
    if (isError) return <h1>{error}</h1>;
    if (isLoading) return <h1>Loading...</h1>;
    if (isSuccess) return <pre>{data}</pre>;


    return (
        <div className="App">
            <p>Hello</p>
            {/*{data &&*/}
            {/*    data.podcasts.map((post) => <p>post.title</p>)}*/}
        </div>
    );
}

export default App;
