import { useContext, useState } from 'react'
import { Context } from '../context/Context';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hook/useAxios';

export interface CategoryType {
    id: string;
    title:string;
}
const Categories = () => {
    const {setCategoryId} = useContext(Context)
    const [isActive, setIsActive] = useState<string>("All")

    function categoryBtnClick(title:string, id:string):void{
        setIsActive(title)
        setCategoryId(id)
    }

    const {data:categories = []} = useQuery({
        queryKey:["categories"],
        queryFn:() => useAxios().get("/categories").then(res => res.data),
        enabled:true
    })
  return (
    <div className='flex items-center justify-between'>
        <div className="flex space-x-[6px]">
            {categories.map((item:CategoryType) => (
                <button onClick={() => categoryBtnClick(item.title, item.id)} className={`py-[14px] px-[30px] ${isActive == item.title ? "bg-[#282828] text-white" : "bg-[#e2e2e2] text-black"} cursor-pointer text-center text-[16px] font-semibold rounded-[30px]`} key={item.id}>{item.title}</button>
            ))}
        </div>
        <div className="flex items-center gap-[7px]">
            {/* arrow icon  */}
            <p className='font-bold text-[14px]'>cortirovka po</p>
            <span className='text-[14px] text-[#FE5F1E]'>POPULAR</span>
        </div>
    </div>
  )
}

export default Categories