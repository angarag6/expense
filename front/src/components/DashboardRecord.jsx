
import house from "../../public/img/House.png";


export default function DashboardRecord({ records, categories }) {

  return (
    <div className="w-[1152px] flex  justify-center gap-11 ">
      <div className="flex flex-col w-[1152px] ">
        <p>Last Records</p>
        {records &&
          records.map((record, index) => (  
            <div key={index} className="flex gap-6 mb-3 items-center px-4 py-2 bg-white rounded-xl ">
              <div key={index} className={`w-[40px] h-[40px] flex justify-center items-center rounded-[20px]`} style={{ background: `${record.transaction_type === "EXP" ? "#F54949" : "#0166FF"}` }}  >
                <img className="w-[20px] h-[20px]" src={house.src} alt="House Icon" />
              </div>
              <div className="flex justify-between w-[950px]">
                <div>
                  <p>{record.name}</p>
                  <p>{record.category}</p>
                  <p>{record.created_at}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-[16px] font-semibold" style={{ color: `${record.transaction_type === "EXP" ? "#F54949" : "#0166FF"}` }}   >
                    {record.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
