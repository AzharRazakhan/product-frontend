import { useState } from "react";
import { Box } from "@mui/material";

const DUMMY_IMAGES = [
    "https://picsum.photos/id/1011/600/400",
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1025/600/400",
];

function ImageSlider({ images }) {
    const [mainImage, setMainImage] = useState(images[0]);
    images = DUMMY_IMAGES;

    return (
        <Box >
            <img
                src={mainImage}
                alt="product"
                style={{
                    width: "100%",
                    borderRadius: 8,
                    marginBottom: 10,
                }}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img || 'https://picsum.photos/300/200?random=1'}
                        alt="thumb"
                        width={60}
                        style={{
                            cursor: "pointer",
                            border: mainImage === img ? "2px solid #1976d2" : "1px solid #ccc",
                            borderRadius: 4,
                        }}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default ImageSlider;
