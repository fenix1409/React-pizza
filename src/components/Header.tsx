import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useSelector } from "react-redux";
import { ProductType } from "../service/Products";
import { BasketIcon } from "../assets/images/Icons";

const Header = () => {
  const navigate = useNavigate();
  const orderedProducts = useSelector(
    (state: { orderList: ProductType[] }) => state.orderList
  );

  const totalPrice = orderedProducts.reduce((val: number, item: ProductType) => {
    val += item.price * item.orderCount;
    return val;
  }, 0);

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
    </div>
  );
};

export default Header;
