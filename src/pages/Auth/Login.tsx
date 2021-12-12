import {useState} from "react";
import useAuth from "modules/useAuth";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = (email: string, password: string) => {
        setIsLoading(true);

        login(email, password)
            .catch(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            <h4>john@doe.com | password</h4>
            <LoginForm handleLoginCallback={handleLogin} isLoading={isLoading} />
        </div>
    );
}

export default Login;