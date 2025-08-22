import React, { useState, useMemo } from 'react'
import Logo from '../assets/Logo.svg'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormFilled } from '@/hooks/useFormFilled'
import { baseURL } from './Signup.jsx'
import axios from 'axios'

const Login = () => {
  const { values, handleChange, isFilled } = useFormFilled({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const postLoginRequest = () => {
    axios
      .post(`${baseURL}/api/users/login/`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        alert(response.data.message)
        localStorage.setItem('Token', response.data.token)
        localStorage.setItem('user.id', response.data.user.id)
        localStorage.setItem('user.nickname', response.data.user.nickname)
        navigate('/home')
      })
      .catch((error) => {
        alert('로그인에 실패하셨습니다.')
      })
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='min-h-screen flex flex-col items-center justify-items-center bg-white w-full max-w-[768px]'>
        <img className='mt-[20vh]' src={Logo} />
        <form className='flex flex-col gap-[1.184vh] mt-[10vh]'>
          <AuthBox label='이메일' name='email' value={values.email} onChange={handleChange} />
          <AuthBox
            label={'비밀번호'}
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <div className='mt-[4.74vh] flex flex-col justify-center items-center justify-items-center'>
            <AuthBtn text={'로그인하기'} onClick={postLoginRequest} disabled={!isFilled} />
            <p className='font-[Medium] font-[16px] text-primary mt-[1.184vh]'>
              아직 계정이 없으신가요?
              <Link to='/Signup' className='underline ml-[5px]'>
                회원가입하기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
