import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";

import {
    Container,
    Grid,
    Typography,
    Card,
    Box
} from "@mui/material";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/products/${id}`).then((res) => setProduct(res.data.data));
    }, [id]);

    if (!product) return <Typography>Loading...</Typography>;
    console.log(product, 'product---')

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <Card sx={{ p: 3 }}>
                    <Grid container spacing={4}>

                        {/* LEFT: IMAGE */}
                        <Grid item xs={12} md={5}>
                            <ImageSlider images={[product.galleryImage]} />
                        </Grid>

                        {/* RIGHT: DETAILS */}
                        <Grid item xs={12} md={7}>
                            <Typography variant="h4" gutterBottom>
                                {product.name}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                {product.metaTitle}
                            </Typography>

                            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                                ₹{product.discountedPrice || product.price}
                            </Typography>

                            <Box
                                sx={{ mb: 3 }}
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />

                        </Grid>

                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default ProductDetail;
