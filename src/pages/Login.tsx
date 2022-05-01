import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Center,
  Link,
} from "@chakra-ui/react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { auth } from "../service/FirebaseServices";
import { UI_CONFIG } from "../const";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        alert("Succesful");
      })
      .catch((error) => {
        alert(error.message);
      });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="your-email@gmail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="******"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack>
                <Link onClick={() => navigate("./register")}>
                  Don't have an account?
                </Link>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isDisabled={!email || !password}
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
                <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={auth} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  return (
    auth.currentUser && (
      <Flex
        textAlign="center"
        py={10}
        px={6}
        flexDir="column"
        align={"center"}
        justify={"center"}
        h={innerHeight - 100}
      >
        <Center>
          <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        </Center>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Welcome {auth.currentUser.displayName}! You are now signed-in!
        </Heading>
        <Button mt={2} onClick={() => auth.signOut()}>
          Logout
        </Button>
      </Flex>
    )
  );
};

export default Login;
