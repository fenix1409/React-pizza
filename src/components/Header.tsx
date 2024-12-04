import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useSelector } from "react-redux";
import { ProductType } from "../service/Products";
import { BasketIcon } from "../assets/images/Icons";
import OrderButton from "./OrderButton";
import { ChangeEvent, useState } from "react";
import { Input, Modal, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../hook/useAxios";
import { CategoryType } from "../service/Categories";
import { UploadOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [categoryId, setCategoryId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [size, setSize] = useState<string[] | null>(null)
  const [imgURL, setImgURL] = useState<string>("")

  const queryClient = useQueryClient()

  const orderedProducts = useSelector(
    (state: { orderList: ProductType[] }) => state.orderList
  );

  const totalPrice = orderedProducts.reduce((val: number, item: ProductType) => {
    val += item.price * item.orderCount;
    return val;
  }, 0);
  
  const {data:categoryList} = useQuery({
    queryKey:["categorySelect"],
    queryFn:() => useAxios().get("/categories").then(res => res.data.map((item:CategoryType) => ({label:item.title, value:item.id})))
  })

  const mutation = useMutation({
    mutationFn:(data:any) => useAxios().post("/products", data),
    onSuccess:() => {
      setIsOpen(false)
      queryClient.invalidateQueries({queryKey:['products']})
    }
  })

  function handleSavePizza() {
    const data = {
      categoryId, name, price,size,
      imgURL,
      type: ["тонкое", "традиционное"],
      orderCount: 0
    }
    mutation.mutate(data)
  }

  function handleChooseImg(e:ChangeEvent){
    const res = (e.target as HTMLInputElement).files
    if(res){
      setImgURL(URL.createObjectURL(res[0]))
    }
  }

  return (
    <div className="flex items-center pb-[40px] border-b-[2px] border-[#b9b9b9] justify-between">
      <Link className="flex items-center" to="/">
        <img src={Logo} alt="Site Logo" width={38} height={38} />
        <div className="ml-[17px]">
          <h1 className="text-[29.23px] font-bold">REACT PIZZA</h1>
          <p className="text-[16px] leading-[19.49px] text-[#7B7B7B]">
            Самая вкусная пицца во вселенной
          </p>
        </div>
      </Link>
      <button onClick={() => navigate("/basket")} className="w-[150px] flex items-center justify-center gap-[13px] py-[16px] rounded-[30px] cursor-pointer bg-[#FE5F1E]">
        <span className="text-[16px] font-bold text-white"> {totalPrice} ₽</span>
        <div className="inline-block border-l-[2px] h-[27px] border-[#ffffff40]"></div>
        <BasketIcon />
        <span className="text-[16px] text-white">{orderedProducts.length}</span>
      </button>
      <OrderButton onClick={() => setIsOpen(true)} title="Add Pizza" />
      <Modal className="!w-[600px]" open={isOpen} onCancel={() => setIsOpen(false)} onOk={handleSavePizza}>
        <div className="p-5 space-y-5">
          <Select
            showSearch
            allowClear
            className="w-full"
            size="large"
            placeholder="Choose category"
            optionFilterProp="label"
            options={categoryList}
            onChange={(e) => setCategoryId(e)}
          />
          <Input value={name} className="w-full" onChange={(e) => setName(e.target.value)} size="large" placeholder="Enter name" allowClear/>
          <Input value={price ? price : ""} className="w-full" onChange={(e) => setPrice(Number(e.target.value))} size="large" placeholder="Enter price" allowClear/>
          <Select
            mode="tags"
            size="large"
            allowClear
            style={{width:"100%"}}
            placeholder="Choose size"
            onChange={(e) => setSize(e)}
            options={[
              {
                label:"26 cm",
                value:"26 cm"
              },
              {
                label:"30 cm",
                value:"30 cm"
              },
              {
                label:"40 cm",
                value:"40 cm"
              }
            ]}
          />
          <label className="mt-5 inline-block">
            <input type="file" className="hidden" onChange={handleChooseImg}/>
            <UploadOutlined className="scale-[1.2] cursor-pointer"/>
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
