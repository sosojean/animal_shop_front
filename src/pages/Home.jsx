import BoardList from "../components/board/BoardList";

const Home = (props) => {
    return (<BoardList isAuth={props.isAuth}></BoardList>)
}

export default Home