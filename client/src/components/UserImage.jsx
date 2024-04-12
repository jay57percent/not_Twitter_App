import { Box } from '@mui/material';

const UserImage = ({image, position, top, left, mt, size="60px"}) =>{
    return (
        <Box width={size} height={size} position={position} top={top} left={left} mt={mt}>
            <img 
                style={{ objectfit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    )
}
export default UserImage