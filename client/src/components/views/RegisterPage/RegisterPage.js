import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다')
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          navigate('/login')
        } else {
          alert('회원가입에 실패했습니다')
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      <form style={{ display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Emain</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}></input>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}></input>
        <label>Conirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>

        <br />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
