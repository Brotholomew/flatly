import {useState} from "react";
import useAuth from "modules/useAuth";
import Button from "components/utils/Button";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = () => {
        // Here should be some validation

        setIsLoading(true);

        login(email, password)
            .catch(() => {
                setPassword('');
                setIsLoading(false);
            });
    }

    return (
        <div>
            <h4>john@doe.com | password</h4>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>EMAIL</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <label>PASSWORD</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <Button
                    click={() => handleLogin()}
                    icon="sign-in-alt"
                    loading={isLoading}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;