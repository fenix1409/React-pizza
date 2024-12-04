import React, { ReactNode } from 'react'


interface ButtonType {
    orderClass?:string;
    title:string;
    leftIcon?:ReactNode;
    orderCount?:number;
    onClick?:React.MouseEventHandler<HTMLButtonElement>
}
const OrderButton: React.FC<ButtonType> = ({orderClass, title, leftIcon, orderCount, onClick}) => {
  return (
    <button onClick={onClick} className={`${orderClass} group hover:bg-[#EB5A1E] hover:text-white duration-300 w-[155px] py-[10px] flex justify-center items-center gap-[7px] rounded-[30px] border-[2px] font-semibold text-[16px] text-[#EB5A1E] border-[#EB5A1E]`}>
        {leftIcon}
        <span>{title}</span>
        {orderCount && orderCount > 0 ? <span className='w-[22px] h-[22px] rounded-full group-hover:bg-white group-hover:text-[#EB5A1E] duration-300 text-[13px] bg-[#EB5A1E] text-white'>{orderCount}</span> : null}
    </button>
  )
}

export default OrderButton