'use client'
import { useRouter } from 'next/navigation';
import Geld from '../../../public/img/geld.png'
import check from '../../../public/img/check.png'
export default function Step() {
  const router = useRouter();
  const handle = async () => {
 router.push("/dashboard")
  }

  return (
    <div className='flex flex-col items-center '>
        <img className='mt-[40px]' src={Geld.src}/>
        <ul className="steps w-[500px] mt-[48px]">
        <li className="step step-primary">Currency</li>
        <li className="step step-primary">Finish</li>
      </ul>
        <div className='flex flex-col items-center mt-[140px] gap-5'>
        <img className='w-[40px]' src={check.src}/>
        <p className='text-[24px] font-[600]'>Good job !</p>
        <p className='text-[#475569] text-[16px] font-[400] w-[384px]  text-center'>Your very first account has been created. Now continue to dashboard and start tracking</p>

      <button className='w-[384px] p-[16px] rounded-[20px] bg-blue-600 text-white' onClick={handle}>Go to Dashboard</button>
        </div>

    </div>
  );
}