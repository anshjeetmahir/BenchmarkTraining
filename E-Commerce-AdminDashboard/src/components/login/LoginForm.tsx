import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import { LoginFormInputs } from "@/context/types";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ username, password }: LoginFormInputs) => login(username, password),
        onSuccess: (data) => {
            if (data?.accessToken) {
                setAuth(data.accessToken, data.username);
                navigate("/admin/products");
            }
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        mutate(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
            <TextField
                label="Username"
                fullWidth
                {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
            </Button>

            {error && (
                <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
                    Login failed. Please try again.
                </Typography>
            )}
        </Box>
    );
};

export default LoginForm;
