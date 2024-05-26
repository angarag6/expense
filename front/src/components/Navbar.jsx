import Link from "next/link"
import Vector from "../../public/img/Vector.png"
import avatar from "../../public/img/PLaceholder.png"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
export default function Navbar(params) {
    const path = usePathname()
    const id = path.split('/').pop()
    return (
        <nav className="flex justify-between  items-center box-border py-[16px] px-[120px] bg-white">
            <div className="flex gap-6 justify-center items-center">
                <img src={Vector.src} />
                <p className=" text-[16px] font-semibold">Dashboard</p>
                <Link href={`/dashboard/record?id=${id}`}>Records</Link>
            </div>
            <div className="flex justify-center items-center gap-6">
                <p className=" h-8  px-3 bg-blue-600 text-white w-[75px] rounded-[20px] flex items-center justify-center">+Record</p>
                <img src={avatar.src} />
            </div>
        </nav>
    )

}