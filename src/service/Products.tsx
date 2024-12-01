import { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hook/useAxios';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';

export interface ProductType{
  id:string;
  categoryId:string;
  imgURL:string;
  name:string;
  type:string[];
  size:string[];
  price:number;
  orderCount: number;
}

const Products = () => {
  const {categoryId} = useContext(Context)
  // const orderList = useSelector((state:{orderList:ProductType[]}) => state.orderList)
  
  const {data: products = [] }= useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => useAxios().get('/products', {params: {categoryId}}).then((res) => res.data),
  });
  const [getAllProducts, setGetAllProducts] = useState<ProductType[]>(products)
  useEffect(() => setGetAllProducts(products), [products])
  return (
    <div className='mt-[95px] flex justify-between flex-wrap'>
      {products.map((item:ProductType) => <ProductCard getAllProducts={getAllProducts} setGetAllProducts={setGetAllProducts} key={item.id} item={item}/>)}
    </div>
  )
}

export default Products