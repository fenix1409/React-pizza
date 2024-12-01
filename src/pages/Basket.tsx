import { useDispatch, useSelector } from "react-redux";
import { deleteOrderProduct } from "../store/orderSlice";
import { ProductType } from "../service/Products";
import { DeleteIcon } from "../assets/images/Icons";

const Basket = () => {
  const dispatch = useDispatch();
  const orderedProducts = useSelector(
    (state: { orderList: ProductType[] }) => state.orderList
  );

  const totalPrice = orderedProducts.reduce(
    (val: number, item: ProductType) => {
      val += item.price * item.orderCount;
      return val;
    },0);

  return (
    <div className="bg-white p-5 rounded-md">
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 text-[#868686]">
          <DeleteIcon />
          <span>Очистить корзину</span>
        </button>
      </div>
      <ul className="w-[900px] mx-auto mt-[50px]">
        {orderedProducts.map((item: ProductType) => (
          <li className="flex items-center justify-between" key={item.id}>
            <div className="flex items-center space-x-2">
              <img src={item.imgURL} alt="img" width={80} height={80}/>
              <div>
                <h2 className="text-[22px] font-bold mb-2">{item.name}</h2>
                <p className="text-[16px] text-[#8D8D8D]">{item.type[0]} tecto, {item.size[0]}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-[22px] flex items-center justify-center rounded-full border-[2px] border-[#FF5F1E] text-[#FF5F1E] text-[16px]">-</button>
              <strong>{item.orderCount}</strong>
              <button className="w-[22px] flex items-center justify-center rounded-full border-[2px] border-[#FF5F1E] text-[#FF5F1E] text-[16px]">+</button>
            </div>
              <strong>{item.price * item.orderCount} P</strong>
              <button onClick={() => dispatch(deleteOrderProduct(item.id))} className="text-[#D7D7D7] border-[#D7D7D7]">
                <DeleteIcon/>
              </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between w-[900px] mx-auto mt-10">
        <p>Всего пицц: {orderedProducts.length} шт.</p>
        <p>Сумма заказа: {totalPrice} P</p>
      </div>
    </div>
  );
};

export default Basket;
