import { useState } from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import axios from "axios";

export function Dashboard() {
    const [process, setProcess] = useState("signup");
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("brandwick")) || null
    );

    const handleLogout = () => {
        setLoading(true);

        axios.post('https://brandwick.onrender.com/user/logout',{token:userData.token})
        .then((res)=>{
            setLoading(false);
            toast({
                title: `${res.data.msg}`,
                status: 'success',
                duration: 2000,
                isClosable: true
            })
            localStorage.removeItem("brandwick");
            window.location.reload();
        }).catch((err)=>{
            setLoading(false);
            toast({
                title: `${err.response.data.msg}`,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        })
    };

    return (
        <Box w="320px" m="auto" mt="20px" p="10px">
            {userData && (
                <Text textAlign="center" fontSize="20px" fontWeight="bold">
                    Hi {userData?.name}, {userData?.username}
                </Text>
            )}
            {userData && (
                <Box textAlign='center'>
                    <Button
                    mt="20px"
                    className="process"
                    onClick={handleLogout}
                    w="50%"
                    isLoading={loading}
                    color="#fff"
                    borderRadius="10px"
                    _hover={{bg:'red'}}
                    bg="red"
                    >
                        Logout
                    </Button>
                </Box>
            )}

            {!userData && (
                <Flex w="100%" justifyContent="space-between" gap="5px">
                    <Button
                        className="process"
                        onClick={() => setProcess("signup")}
                        w="50%"
                        variant="unstyled"
                        color={process === "signup" ? "#fff" : "#000"}
                        borderRadius="10px"
                        bg={process === "signup" ? "#00b7ff" : "#e6e6e6"}
                    >
                        Signup
                    </Button>
                    <Button
                        className="process"
                        onClick={() => setProcess("login")}
                        w="50%"
                        variant="unstyled"
                        color={process === "login" ? "#fff" : "#000"}
                        borderRadius="10px"
                        bg={process === "login" ? "#00b7ff" : "#e6e6e6"}
                    >
                        Login
                    </Button>
                </Flex>
            )}

            {process === "signup" && !userData ? (
                <Signup setProcess={setProcess} />
            ) : (
                process === "login" && !userData && <Login setUserData={setUserData} />
            )}
        </Box>
    );
}
