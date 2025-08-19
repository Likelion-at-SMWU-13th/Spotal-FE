import { useState } from 'react'
import Logo from '../assets/Logo.svg'
import SignupImg from '../assets/Signup.svg'
import AuthBox2 from '@/components/auth/AuthBox2.jsx'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'
import { useFormFilled } from '@/hooks/useFormFilled'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { values, handleChange, isFilled } = useFormFilled({
    email: '',
    password: '',
    nickname: '',
  })
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()

  // 중복확인 통과여부 -> 현재 로직 없이 버튼 클릭 시 true 바뀌도록 설정
  const [emailChecked, setEmailChecked] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)

  // 중복 확인 버튼 클릭 시 버튼 색 변경
  const emailBtnBg = emailChecked
    ? 'bg-primary-300 text-primary border border-[1px] border-primary'
    : 'bg-grey-100 text-grey-700'
  const nicknameBtnBg = nicknameChecked
    ? 'bg-primary-300 text-primary border border-[1px] border-primary'
    : 'bg-grey-100 text-grey-700'

  const canSubmit = isFilled && emailChecked && nicknameChecked

  // 회원가입 폼 제출 로직
  const postSignupRequest = () => {
    axios
      .post(`${baseURL}/api/users/signup/`, {
        email: values.email,
        password: values.password,
        nickname: values.nickname,
      })
      .then((response) => {
        console.log(response)
        alert('회원가입에 성공하셨습니다.')
        navigate('/login')
      })
      .catch((error) => {
        console.log('status:', error.response?.status)
        console.log('data:', error.response?.data) // <- 여기!
        console.log('sent:', { ...values })
        alert('회원가입에 실패하셨습니다.')
      })
  }

  // 추후 백엔드 api와 연결 예정
  const handleEmailChecked = () => {
    axios
      .post(`${baseURL}/api/users/check-email/`, {
        email: values.email,
      })
      .then((response) => {
        console.log(response)
        alert('사용 가능한 이메일입니다.')
        setEmailChecked(true)
      })
      .catch((error) => {
        console.log(error)
        alert('사용 불가능한 이메일입니다.')
      })
  }
  const handleNicknamChecked = () => {
    axios
      .post(`${baseURL}/api/users/check-nickname/`, {
        nickname: values.nickname,
      })
      .then((response) => {
        console.log(response)
        alert('사용 가능한 닉네임입니다.')
        setNicknameChecked(true)
      })
      .catch((error) => {
        console.log(error)
        alert('사용 불가능한 닉네임입니다.')
      })
  }

  return (
    <div className='flex flex-col justify-center items-center justify-items-center bg-white'>
      <img className='mt-[11.492vh]' src={Logo} alt='Logo' />
      <img className='mt-[3.08vh]' src={SignupImg} alt='SignupImg' />
      <form
        onSubmit={(e) => {
          e.preventDefault() // 새로고침 방지!
          postSignupRequest()
        }}
      >
        <div className='flex flex-col gap-[0.83vh] mt-0'>
          <AuthBox2
            label={'이메일'}
            bg={emailBtnBg}
            name='email'
            onClick={handleEmailChecked}
            value={values.email}
            onChange={handleChange}
          />
          <AuthBox
            label={'비밀번호'}
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <AuthBox2
            label={'닉네임'}
            name='nickname'
            bg={nicknameBtnBg}
            onClick={handleNicknamChecked}
            value={values.nickname}
            onChange={handleChange}
          />
        </div>
        <div className='mt-[4.74vh]'>
          <AuthBtn text={'회원가입 완료하기'} disabled={!canSubmit} onClick={postSignupRequest} />
        </div>
      </form>
    </div>
  )
}

export default Signup
