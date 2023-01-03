import React from 'react'
import md5 from 'blueimp-md5'
import supbase from '../lib/supbase'
import useUserStore from '../store/useUserStore'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useToast, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react'

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const login = useUserStore(state => state.login)

  const toast = useToast({ position: 'top' })

  const [isLoading, setIsLoading] = React.useState(false)

  const validation = {
    required: true,
    minLength: 8,
    maxLength: 40
  }

  const onSubmit = async data => {
    setIsLoading(true)
    const { data: { user, session }, error } = await supbase.auth.signInWithPassword({
      ...data,
      password: md5(data.password, process.env.REACT_APP_KEY)
    })
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setIsLoading(false)
      return
    }
    login(user, {
      ...session,
      user: undefined
    })
    window.location.href = '/'
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormControl isRequired isInvalid={errors.email}>
          <FormLabel>邮箱</FormLabel>
          <Input type='email' {...register("email", validation)} />
          {errors.email && <FormErrorMessage>请填写邮箱</FormErrorMessage>}
        </FormControl>
        <FormControl isRequired isInvalid={errors.password}>
          <FormLabel>密码</FormLabel>
          <Input type='password' {...register("password", validation)} />
          {errors.password && <FormErrorMessage>请填写密码</FormErrorMessage>}
        </FormControl>
        <Box>
          <Button isLoading={isLoading} className='w-full' colorScheme='blue' type='submit'>登录</Button>
        </Box>
        <Box>
          <Link to='/sign-up'>
            <Button className='w-full' variant='outline' colorScheme='blue'>注册</Button>
          </Link>
        </Box>
      </form>
    </div>
  )
}