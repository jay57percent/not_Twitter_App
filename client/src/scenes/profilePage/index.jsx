import { Box, useMediaQuery, Typography, useTheme, Divider } from "@mui/material";
import UserImage from "components/UserImage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import WidgetWrapper from "components/WidgetWrapper"
import FlexBetween from "components/FlexBetween";

const ProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({ firstName: '', lastName: '', friends: [], picturePath: '' });
    const { palette } = useTheme(); 
    const token = useSelector((state)=>state.token)
    const isProfile = true;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data =  await response.json()
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <Box>
          <Navbar />
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="1.1rem" >
            <img
                
                width={isNonMobileScreens ? "62%" : "88%"}
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem", boxShadow: "0px 4px 6px 1px rgba(0,0,0,0.3)"}}
                src={`http://localhost:3001/assets/${user.coverPicturePath}`}
                boxShadow= "0px 4px 6px 1px rgba(0,0,0,0.1)"
            />
              
                <UserImage image={user.picturePath} size="120px" mt="1.5rem"/>
  
                  <Box display="flex" flexDirection="column"  mt="1rem">
                                      <Typography
                                          variant="h3"
                                          color={dark}
                                          fontWeight="500"
                                          sx={{
                                              "&:hover": {
                                                  color: palette.primary.light,
                                                  cursor: "pointer"
                                              }
                                          }}
                                      >
                                          {user.firstName} {user.lastName}
                                      </Typography>
                                      <Box display="flex" justifyContent="flex-end" >
                                          <Typography color={medium} >{user?.friends.length} friends</Typography>
                                      </Box>               
                  </Box>
              
              
            </Box>
            
            <Box display="flex" justifyContent="center" width="100%" mt="1rem">
                <Divider width={isNonMobileScreens ? "62%" : "88%"} />
                
            </Box>
          
          <Box
            width="100%"
            padding="0.2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="5rem"
            justifyContent="center"
            mt="1.5rem"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={userId} picturePath={user.picturePath} isProfile={true} />
              <Box m="2rem 0" />
              <FriendListWidget isProfile={isProfile} userId={userId} />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <MyPostWidget  picturePath={user.picturePath} />
              <Box m="2rem 0" />
              <PostsWidget userId={userId} isProfile={isProfile} />
            </Box>
          </Box>
        </Box>
      );

}

export default ProfilePage;