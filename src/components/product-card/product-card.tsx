import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main.tsx';
import { CiCircleMinus } from "react-icons/ci";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    id: number;
    price: number;
    name: string;
    weight: number;
    image: string;
    onAdd: () => void;
    isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = observer(({ id, price, name, weight, image, onAdd, isInCart }) => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [shake, setShake] = useState(false);

    const cartItem = store.cart.find((item) => item.product.id === id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const handleAddClick = () => {
        onAdd();
        setShake(true);
        setTimeout(() => setShake(false), 300);
    };

    const handleRemove = () => {
        if (currentQuantity > 1) {
            store.updateCartItemQuantity(id, currentQuantity - 1);
        } else {
            store.removeFromCart(id);
        }
        setShake(true);
        setTimeout(() => setShake(false), 300);
    };

    const shakeAnimation = {
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.5 }
    };

    return (
        <div className="flex justify-center font-mulish text-[#433E9C]">
            <div className="my-2">
                <div className="bg-[#99D4E6] dark:bg-[#0D0D0D] w-5/5 h-4/6 rounded-lg content-center">
                    <img
                        className="bg-[#99D4E6] dark:bg-[#0D0D0D] w-[156px] h-[152px] rounded-lg"
                        src={image}
                        alt={name}
                        onClick={() => navigate(`/product/${id}`)}
                    />
                </div>
                <div className="my-2">
                    <h1>{name}</h1>
                    <h2 className="text-gray-500 text-xs">{weight} г</h2>
                </div>
                <div className="flex items-center">
                    {isInCart && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mr-1"
                            onClick={handleRemove}
                        >
                            <CiCircleMinus className="mr-1 w-[25px] h-[25px] text-[#E65282]" />
                        </motion.button>
                    )}
                    <motion.button
                        onClick={handleAddClick}
                        className={
                            isInCart
                                ? "bg-[#E65282] w-[77px] h-[25px] rounded-xl text-white text-[12px]"
                                : "outline outline-[#E65282] outline-1 text-[#E65282] bg-transparent w-[77px] h-[25px] rounded-xl text-xs"
                        }
                        animate={shake ? shakeAnimation : {}}
                    >
                        <div className="flex justify-center">
                            <span className='mr-2'>{price}P</span>
                            {currentQuantity > 0 ? (
                            <span className="mr-1">× {currentQuantity}</span>
                            ) : (
                            <p className="ml-3">+</p>
                            )}
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    );
});

export default ProductCard;
