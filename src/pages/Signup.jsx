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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        await axios.post("/auth/signup", form);
        navigate("/login");
    };


    return (
        <>
            <Navbar />
            <Container maxWidth="xs">
                <Paper sx={{ p: 4, mt: 8 }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
                            <PersonAddAltIcon />
                        </Avatar>

                        <Typography variant="h5" mb={2}>
                            Sign Up
                        </Typography>

                        <Box component="form" onSubmit={submit} width="100%">
                            <TextField
                                label="Full Name"
                                name="name"
                                fullWidth
                                required
                                margin="normal"
                                value={form.name}
                                onChange={handleChange}
                            />

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
                                Sign Up
                            </Button>

                            <Typography align="center" mt={2}>
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Signup;
