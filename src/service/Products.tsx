import { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hook/useAxios';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';

export interface ProductType {
  id: string;
  categoryId: string;
  imgURL: string;
  name: string;
  type: string[];
  size: string[];
  price: number;
  orderCount: number;
}

const Products = () => {
  const { categoryId } = useContext(Context)
  const orderedList = useSelector((state: { orderList: ProductType[] }) => state.orderList)

  const { data: products = [] } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => useAxios().get(`/products`, { params: { categoryId:categoryId != "1" ? categoryId : null } }).then((res) => res.data),
    enabled:true
  });
  const [getAllProducts, setGetAllProducts] = useState<ProductType[]>(products)
  useEffect(() => setGetAllProducts(products), [products])
  
  useEffect(() => {
    const updatedProducts = getAllProducts.map((product) => {
        const orderedProduct = orderedList.find((item) => item.id === product.id);
        return { ...product, orderCount: orderedProduct ? orderedProduct.orderCount : 0 };
    });
    setGetAllProducts(updatedProducts);
}, []);

  return (
    <div className='mt-[95px] flex justify-between flex-wrap'>
      {getAllProducts.map((item: ProductType) => <ProductCard getAllProducts={getAllProducts} setGetAllProducts={setGetAllProducts} key={item.id} item={item} />)}
    </div>
  )
}

export default Products