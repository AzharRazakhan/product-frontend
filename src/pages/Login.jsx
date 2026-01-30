import { useState } from "react";
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="xs">
                <Paper sx={{ p: 4, mt: 8 }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography variant="h5" mb={2}>
                            Login
                        </Typography>

                        <Box component="form" onSubmit={submit} width="100%">
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                required
                                margin="normal"
                                value={form.email}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                required
                                margin="normal"
                                value={form.password}
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>

                            <Typography align="center" mt={2}>
                                Don’t have an account?
                                <Link to="/signup">Sign up</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Login;
