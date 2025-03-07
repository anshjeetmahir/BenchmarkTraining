import { Container, Paper } from "@mui/material";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 3 }}>
                <LoginHeader />
                <LoginForm />
            </Paper>
        </Container>
    );
};

export default LoginContainer;
