"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Geld from '../../../public/img/geld.png';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("http://localhost:8003/users/auth", {
        email,
        password,
      });
      const userData = response.data
      if (userData && (userData.id || userData.email)) {
        console.log(userData)
        localStorage.setItem('user', JSON.stringify({...userData}))
        router.push(`/dashboard/${userData.email}`);
      } else {
        console.log("Login failed:", response.data);
        setError("Invalid email or password");
      }
      console.log(response)
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again later.");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className='flex'>
      <div className='h-screen w-1/2 '>
        <div className='fixed top-[25%] left-[15%] flex flex-col items-center '>
          <img src={Geld.src} alt="Geld Logo" />
          <h2 className='mt-[40px] text-[24px] font-[600] '>Welcome Back</h2>
          <p className='text-[#475569] text-[16px] font-[400] w-[384px]  text-center mt-[5px]'>Welcome back, Please enter your details</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? (
            <span className="loading loading-spinner loading-lg mt-5"></span>

          ) : (<div className='flex flex-col mt-[40px] gap-3'>
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
            <button className='w-[354px] h-[48px] p-[16px] rounded-[30px] bg-blue-600 text-white' onClick={handleLogin}>Login</button>
          </div>)}

          <div className='flex gap-3 mt-[40px]'>
            <p>Don't have an account?</p>
            <Link href='/signup'>
              <p className=' text-blue-600 cursor-pointer' >Sign up</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='h-screen w-1/2 bg-blue-600'></div>
    </div>
  );
};

export default LoginPage;
