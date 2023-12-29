import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from 'react'
import axios from "axios";
import 'animate.css';

export function Login({ setUserData }) {

    const [passwordToggle, setPasswordToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [formdata, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        axios.post('https://brandwick.onrender.com/user/login', formdata)
            .then((res) => {
                setLoading(false);
                toast({
                    title: `${res.data.msg}`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                localStorage.setItem('brandwick', JSON.stringify(res.data));
                setUserData(res.data);
                setFormData({ email: '', password: '' });

            }).catch((err) => {
                setLoading(false);
                toast({
                    title: `${err.response.data.msg}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
                setFormData({ email: '', password: '' });

            })

    }


    return (
        <Box w='100%' p='10px' mt='30px'>
            <form onSubmit={handleSubmit} class="animate__animated animate__fadeInUp">

                <FormControl isRequired>

                    <FormLabel>Your Email</FormLabel>
                    <InputGroup>
                        <InputLeftElement bg='#f1f1f1' borderRadius='5px 0px 0px 5px'><EmailIcon /></InputLeftElement>
                        <Input value={formdata.email} onChange={(e) => setFormData({ ...formdata, email: e.target.value })} _focus={{ ring: 'none', border: '1px solid #e3e3e3', boxShadow: '1px 1px 5px #e6e6e6' }} type='email' placeholder='Eg. ram@gmail.com' required />
                    </InputGroup><br />

                    <FormLabel>Your Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement bg='#f1f1f1' borderRadius='5px 0px 0px 5px'><LockIcon /></InputLeftElement>
                        <InputRightElement cursor='pointer' onClick={() => setPasswordToggle(prev => !prev)}>{passwordToggle ? <ViewIcon /> : < ViewOffIcon />}</InputRightElement>
                        <Input value={formdata.password} onChange={(e) => setFormData({ ...formdata, password: e.target.value })} _focus={{ ring: 'none', border: '1px solid #e3e3e3', boxShadow: '1px 1px 5px #e6e6e6' }} type={passwordToggle ? 'text' : "password"} placeholder='**********' required />
                    </InputGroup><br />

                    <Button isLoading={loading} w='100%' _hover={{ bg: '#008cff' }} bg='#008cff' color='white' type='submit'>Login</Button>


                </FormControl>
            </form>
        </Box>
    )
}
