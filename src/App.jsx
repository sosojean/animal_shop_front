import "../src/assets/styles/setting.css";
import "../src/assets/styles/reset.css";
import "../src/assets/styles/common.css";

import {QueryClient, QueryClientProvider} from "react-query";
import Router from "./components/layout/Router";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";

function App() {
    // const [nickName, setNickName] = useState('');
    const [reload, setReload] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        token ? setIsAuth(true) : setIsAuth(false);
    }, [reload]);

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Router isAuth={isAuth} reload={reload} setReload={setReload}/>
            </div>
            <ToastContainer autoClose={3000} />
        </QueryClientProvider>
    );
}

export default App;
