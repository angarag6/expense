"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Geld from '../../../public/img/geld.png'
import CurrencyLogo from '../../../public/img/currency.png'


export default function Step() {
  const [currency_type, setCurrency] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem('data'));
    console.log(storedEmail);
    setEmail(storedEmail);
  }, []);
  const handle = async () => {
    try {
      setLoading(true);
      const response = await axios.put('http://localhost:8003/users/user', { currency_type, ...email, });
      console.log(response.data);
      router.push("/step2");
    } catch (error) {
      console.error('Error updating user:', error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <img className='mt-[40px]' src={Geld.src} />
      <ul className="steps w-[500px] mt-[48px]">
        <li className="step step-primary">Currency</li>
        <li className="step">Balance</li>
        <li className="step">Finish</li>
      </ul>
      <div className='flex flex-col gap-5 items-center mt-[140px]'>
        <img className='w-[40px]' src={CurrencyLogo.src} />
        <p className='text-[24px] font-[600]'>Select base currency</p>
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <>
            <p className='text-[#475569] text-[16px] font-[400] w-[384px]  text-center'>Your base currency should be the one you use most often. All transaction in other currencies will be calculated based on this one </p>
            <select className='h-[64px] p-[16px] rounded-lg border-[#D1D5DB] border-solid border-[1px] bg-[#F3F4F6] w-[354px]' onChange={(e) => setCurrency(e.target.value)}>
              <option value='mnt'>MNT-Mongolian Tugrik</option>
              <option value='usd'>USD-American dollar</option>
            </select>
          </>
        )}
        <button className='w-[384px] p-[16px] rounded-[20px] bg-blue-600 text-white' onClick={handle}>Confirm</button>
      </div>
    </div>
  );
}

