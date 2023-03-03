import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { infoLoader, login } from '../api/main'
import authHeader from '../lib/authHeader'

const Signin = () => {

  const [form, setForm] = useState({email: '', password: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async () => {
    const reqData = {...form}

    const { success, message, token } = await login(reqData)
    if(success){
      localStorage.setItem('stripe_auth', token)
      authHeader()
      infoLoader(dispatch)
      toast.success(message)
      navigate('/')
    } else {
      toast.error(message)
    }
  }

  return (
    <div className='flex flex-col items-center pt-20'>
    <div className='text-2xl'>Sign In</div>
    <div className='w-1/4 mx-auto flex flex-col justify-start'>
      <label className='mb-2'>Email</label>
      <input className='outline outline-gray-800 rounded-md p-1.5 mb-4 ' type={'email'} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
      <label className='mb-2'>Password</label>
      <input className='outline outline-gray-800 rounded-md p-1.5 mb-4 ' type={'password'} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
      <button onClick={submitHandler} className={"bg-teal-500 px-3 py-1.5 rounded text-white"}>Login</button>
    </div>
  </div>
  )
}

export default Signin