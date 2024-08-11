import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                bgcolor: 'background.paper',
                textAlign: 'center',
                position: 'inherit',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} All rights reserved
            </Typography>
        </Box>
    );
}
