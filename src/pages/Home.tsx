import useAuth from "modules/useAuth";

function Home() {
    const { logout } = useAuth();

    return (
        <div>
            <h3>Home page</h3>
            <button onClick={() => logout()}>Log out</button>
        </div>
    );
}

export default Home;