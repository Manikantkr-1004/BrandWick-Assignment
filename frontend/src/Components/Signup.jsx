import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import { AtSignIcon, EmailIcon, LockIcon, PhoneIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from 'react'
import axios from "axios"

export function Signup({ setProcess }) {

    const [passwordToggle, setPasswordToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [formdata, setFormData] = useState({ name: '', username: '', email: '', password: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formdata.phone.toString().length !== 10) {
            toast({
                title: 'Mobile no. should be in 10 digit',
                status: 'warning',
                duration: 3000,
                isClosable: true
            })
            setFormData({ ...formdata, phone: '' })
            return;
        }

        setLoading(true);
        axios.post('https://brandwick.onrender.com/user/signup', formdata)
            .then((res) => {
                setLoading(false);
                toast({
                    title: `${res.data.msg}`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                setProcess('login');
                setFormData({ name: '', username: '', email: '', password: '', phone: '' });

            }).catch((err) => {
                setLoading(false);
                toast({
                    title: `${err.response.data.msg}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
                setFormData({ ...formdata, email: '' });

            })

    }


    return (
        <Box w='100%' p='10px' mt='30px'>
            <form onSubmit={handleSubmit} class="animate__animated animate__fadeInUp">

                <FormControl isRequired>

                    <FormLabel>Your Full Name</FormLabel>
                    <InputGroup>
                        <InputLeftElement bg='#f1f1f1' borderRadius='5px 0px 0px 5px'>👤</InputLeftElement>
                        <Input value={formdata.name} onChange={(e) => setFormData({ ...formdata, name: e.target.value })} _focus={{ ring: 'none', border: '1px solid #e3e3e3', boxShadow: '1px 1px 5px #e6e6e6' }} type='text' placeholder='Eg. Ram Kumar' required />
                    </InputGroup><br />

                    <FormLabel>Your Username</FormLabel>
                    <InputGroup>
                        <InputLeftElement bg='#f1f1f1' borderRadius='5px 0px 0px 5px'>< AtSignIcon /></InputLeftElement>
                        <Input value={formdata.username} onChange={(e) => setFormData({ ...formdata, username: e.target.value })} _focus={{ ring: 'none', border: '1px solid #e3e3e3', boxShadow: '1px 1px 5px #e6e6e6' }} type='text' minLength='3' maxLength='10' placeholder='Eg. ram@12' required />
                    </InputGroup><br />

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

                    <FormLabel>Your Mobile No.</FormLabel>
                    <InputGroup>
                        <InputLeftElement bg='#f1f1f1' borderRadius='5px 0px 0px 5px'><PhoneIcon /></InputLeftElement>
                        <Input value={formdata.phone} onChange={(e) => setFormData({ ...formdata, phone: +e.target.value })} _focus={{ ring: 'none', border: '1px solid #e3e3e3', boxShadow: '1px 1px 5px #e6e6e6' }} type='number' placeholder='Eg. 1234567890' required />
                    </InputGroup><br />

                    <Button isLoading={loading} w='100%' _hover={{ bg: '#008cff' }} bg='#008cff' color='white' type='submit'>Create Account</Button>


                </FormControl>
            </form>
        </Box>
    )
}
