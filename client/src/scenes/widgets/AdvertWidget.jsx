import { Typography, useTheme, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
const AdvertWidget = () => {
    const { palette } =useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <FlexBetween gap="0.3rem">
                    <Typography color={medium}>
                        Create Ad
                    </Typography>
                    <IconButton>
                        <AddBusinessIcon />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            <img
                    width="100%"
                    height="auto"
                    alt="advert"
                    src="http://localhost:3001/assets/GTA-6-1-1.jpg"
                    style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main}>Garnd Theft Auto VI</Typography>
                <Typography color={main}>Rockstar Games</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                "Grand Theft Auto VI," set for a 2025 launch on PlayStation 5 and Xbox Series X/S, is the eighth main entry in the series. 
                Set in the fictional Leonida (akin to Florida) with a Miami-like Vice City, it follows criminals Lucia and her partner, 
                highlighting Lucia as the first female lead since 2000. Development started in 2014 under "Project Americas," 
                focusing on a dynamic map and sustainable expansion post-launch to prevent developer crunch.
            </Typography>
        </WidgetWrapper>
    )
}
export default AdvertWidget
