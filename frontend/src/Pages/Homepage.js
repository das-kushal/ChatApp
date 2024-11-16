import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Center,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (user) navigate("/chats");
  // }, [navigate]);

  return (
    <Container maxW="xl" centerContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Box boxShadow='dark-lg' bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px"
        backdropBlur='20px' backdropFilter='auto'
      //  style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.9)' }}
      >
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          bgColor="transparent"
        >
          <Center fontSize="4xl" fontFamily="Work sans">
            <Center color="blue.400" px={4} justifyContent="center" alignItems="center" fontSize="4xl">
              <ChatIcon />
            </Center>
            My-Chat
          </Center>
        </Box>
        <Tabs isFitted variant="soft-rounded" colorScheme="yellow">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;