import { useEffect, useState } from 'react';
import Navbar from './../components/Navbar';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    CircularProgress,
} from "@mui/material";
function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products");
            setProducts(res.data.data);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    console.log(products)

    return (
        <>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Product List
                </Typography>

                <Grid container spacing={3}>
                    {products.length === 0 ? (
                        <Typography>No products found</Typography>
                    ) : (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Card sx={{ height: "100%" }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={
                                            product.galleryImage ||
                                            "https://picsum.photos/300/200?random=1"
                                        }
                                        alt={product.name}
                                    />

                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {product.name}
                                        </Typography>

                                        <Typography color="text.secondary" mt={1}>
                                            ₹ {product.price}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            mt={1}
                                            sx={{ minHeight: 40 }}
                                        >
                                            {product.description}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mt: 2,
                                            }}
                                        >
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() =>
                                                    navigate(`/product/${product._id}`)
                                                }
                                            >
                                                View
                                            </Button>
                                            {isLoggedIn
                                                &&
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() =>
                                                        navigate(`/edit-product/${product._id}`)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            }
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </>
    );
}

export default ProductList;