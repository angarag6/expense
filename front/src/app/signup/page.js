'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Geld from '../../../public/img/geld.png'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setLoading(true)
      const response = await axios.post('http://localhost:8003/users', { name, email, password });
      localStorage.setItem('data', JSON.stringify({ email }))
      console.log(response.data);
      router.push('/step');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email already exists.');
      } else {
        console.error('Signup error:', error);
        setError('An error occurred during signup.');
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='flex'>
      <div className='h-screen w-1/2' >
        <div className='fixed top-[20%] left-[15%] flex flex-col items-center'>
          <img className='h-[50px] ' src={Geld.src} />
          <p className='text-[24px] font-[600] mt-[40px]'>Create Geld account</p>
          <p className='text-[#475569] text-[16px] font-[400] w-[384px]  text-center mt-[5px]'>Sign up below to create your Wallet account</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? (
       <span className="loading loading-spinner loading-lg mt-5"></span>
          ):(   <div className='flex flex-col mt-[40px] gap-3'>
          <input
       className='h-[48px] p-[16px] rounded-lg border-[#D1D5DB] border-solid border-[1px] bg-[#F3F4F6] w-[354px]'
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
                   className='h-[48px] p-[16px] rounded-lg border-[#D1D5DB] border-solid border-[1px] bg-[#F3F4F6] w-[354px]'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
                   className='h-[48px] p-[16px] rounded-lg border-[#D1D5DB] border-solid border-[1px] bg-[#F3F4F6] w-[354px]'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
                   className='h-[48px] p-[16px] rounded-lg border-[#D1D5DB] border-solid border-[1px] bg-[#F3F4F6] w-[354px]'
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        <button className='w-[354px] h-[48px] p-[16px] rounded-[30px] bg-blue-600 text-white' onClick={handleSignup}>Signup</button>
        </div>)}
       

          <div className='flex gap-3 mt-[40px]'>
            <p>Already have account?</p>
          <Link href='/login'>
            <p className='text-blue-600 cursor-pointer'>Login</p>
          </Link>
          </div>
        </div>

      </div>
      <div className='h-screen w-1/2 bg-blue-600'></div>

    </div>

  );
};

export default Signup;

