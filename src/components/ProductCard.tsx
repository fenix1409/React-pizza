import React, { SetStateAction, useState } from "react"
import { Segmented } from "antd"
import { useDispatch } from "react-redux"
import OrderButton from "./OrderButton"
import { saveOrderProducts } from "../store/orderSlice"
import { ProductType } from "../service/Products"
import { AddIcon } from "../assets/images/Icons"


interface ProductCardType {
    item: ProductType,
    getAllProducts: ProductType[],
    setGetAllProducts: React.Dispatch<SetStateAction<ProductType[]>>
}


const ProductCard: React.FC<ProductCardType> = ({ item, getAllProducts, setGetAllProducts }) => {
    const dispatch = useDispatch()
    const [type, setType] = useState<string>("тонкое")
    const [size, setSize] = useState<string>(item.size[0])

    function SegmentedOption(arr: string[]): any {
        const list = [
            { label: "26 cm", value: "26 cm", disabled: true },
            { label: "30 cm", value: "30 cm", disabled: true },
            { label: "40 cm", value: "40 cm", disabled: true }
        ]
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == list[i].label) {
                    list[i].disabled = false
                }
            }
        }
        return list
    }

    function handleOrderBtnClick() {
        let data = {...item, orderCount:item.orderCount+=1}
        setGetAllProducts(getAllProducts.map((value:ProductType) => value.id == item.id ? data : value))

        dispatch(saveOrderProducts({...data, type:[type], size:[size]}))
    }
    return (
        <div className="w-[280px] flex flex-col items-center">
            <img src={item.imgURL} alt="img" width={260} height={260} />
            <h2 className="text-[20px] font-bold">{item.name}</h2>
            <Segmented<string> options={["тонкое", "традиционное"]} onChange={(e) => setType(e)} />
            <Segmented<string> options={SegmentedOption(item.size)} onChange={(e) => setSize(e)} />
            <div onClick={handleOrderBtnClick} className="w-full flex items-center justify-between mt-5">
                <strong className="text-[22px]">от {item.price} ₽</strong>
                <OrderButton title="Добавить" leftIcon={<AddIcon/>} orderCount={item.orderCount}/>
            </div>
        </div>
    )
}

export default ProductCard