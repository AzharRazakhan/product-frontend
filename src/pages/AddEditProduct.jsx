import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import Navbar from './../components/Navbar';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
function AddEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate();

  const initialState = {
    metaTitle: "",
    name: "",
    slug: "",
    galleryImage: "",
    price: "",
    discountedPrice: "",
    description: "",
  };
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (id) {
      axios.get(`/products/${id}`).then((res) => {
        const {
          metaTitle,
          name,
          slug,
          galleryImage,
          price,
          discountedPrice,
          description,
        } = res.data.data;
        setForm({
          metaTitle,
          name,
          slug,
          galleryImage,
          price,
          discountedPrice,
          description,
        });
      });
    }
  }, [id]);
  const submit = async (e) => {
    e.preventDefault();
    id
      ? await axios.put(`/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      : await axios.post("/products", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };




  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            {id ? "Edit Product" : "Add Product"}
          </Typography>

          <Box component="form" onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Meta Title"
                  name="metaTitle"
                  fullWidth
                  required
                  value={form.metaTitle}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  name="name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Slug"
                  name="slug"
                  fullWidth
                  required
                  value={form.slug}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Gallery Image URL"
                  name="galleryImage"
                  fullWidth
                  placeholder="https://image-url.jpg"
                  value={form.galleryImage}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  required
                  value={form.price}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Discounted Price"
                  name="discountedPrice"
                  type="number"
                  fullWidth
                  value={form.discountedPrice}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                />
              </Grid>
              <br />
              
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >

                  {id ? "Update Product" : "Add Product"}

                </Button>
             
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AddEditProduct 