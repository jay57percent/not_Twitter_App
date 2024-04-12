import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from './Form'


const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
    return (
        <Box >
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
                boxShadow= "3"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                NotTwitter        σ ﾟ∀ ﾟ) ﾟ∀ﾟ)σ
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p = "2rem"
                m = "2rem auto"
                borderRadius = "1.5rem"
                backgroundColor={theme.palette.background.alt}
                boxShadow= "0px 4px 6px 1px rgba(0,0,0,0.1)"
                
                
                >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    What's up ? Login or Register 
                </Typography>
                <Form />
            </Box>
        </Box>
    )

}

export default LoginPage;