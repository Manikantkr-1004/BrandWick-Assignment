import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function Dashboard() {
    const [process, setProcess] = useState("signup");
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("brandwick")) || null
    );

    const handleLogout = () => {
        localStorage.removeItem("brandwick");
        window.location.reload();
    };

    return (
        <Box w="320px" m="auto" mt="20px" p="10px">
            {userData && (
                <Text textAlign="center" fontSize="20px" fontWeight="bold">
                    Hi {userData?.name}, {userData?.username}
                </Text>
            )}
            {userData && (
                <Button
                    display="block"
                    m="auto"
                    mt="20px"
                    className="process"
                    onClick={handleLogout}
                    w="50%"
                    variant="unstyled"
                    color="#fff"
                    borderRadius="10px"
                    bg="red"
                >
                    Logout
                </Button>
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
