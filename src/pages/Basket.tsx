import { useDispatch, useSelector } from "react-redux";
import { deleteOrderProduct } from "../store/orderSlice";
import { ProductType } from "../service/Products";
import { ClearIcon, DeleteIcon, Korzina } from "../assets/images/Icons";
import Logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Basket = () => {
  const dispatch = useDispatch();
  const orderedProducts = useSelector(
    (state: { orderList: ProductType[] }) => state.orderList
  );

  const totalPrice = orderedProducts.reduce(
    (val: number, item: ProductType) => {
      val += item.price * item.orderCount;
      return val;
    }, 0);

  return (
    <div className="bg-white p-5 rounded-md">
      <Link className="flex items-center" to="/">
        <img src={Logo} alt="Site Logo" width={38} height={38} />
        <div className="ml-[17px]">
          <h1 className="text-[29.23px] font-bold">REACT PIZZA</h1>
          <p className="text-[16px] leading-[19.49px] text-[#7B7B7B]">
            Самая вкусная пицца во вселенной
          </p>
        </div>
      </Link>
      <div className="w-[821px] mx-auto mt-[135px]">
        <div className="flex justify-between">
          <Korzina />
          <button className="flex items-center space-x-2 text-[#868686]"><ClearIcon /></button>
        </div>
        <ul className="w-[900px] mx-auto mt-[50px] space-y-[30px]">
          {orderedProducts.map((item: ProductType) => (
            <li className="flex items-center justify-between" key={item.id}>
              <div className="flex items-center space-x-2 w-[375px]">
                <img src={item.imgURL} alt="img" width={80} height={80} />
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
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between w-[900px] mx-auto mt-10">
        <p className="text-[22px] leading-[26px]">Всего пицц: <span className="text-[22px] leading-[26px] font-bold">{orderedProducts.length} шт.</span></p>
        <p className="text-[22px] leading-[26px] ">Сумма заказа: <span className="text-[22px] leading-[26px] text-[#FE5F1E] font-bold">{totalPrice} ₽</span></p>
      </div>
    </div>
  );
};

export default Basket;
