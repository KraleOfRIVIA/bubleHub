import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../main.tsx';
import { useNavigate } from 'react-router-dom';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BackButton, MainButton} from '@twa-dev/sdk/react';
import BottomButton from '../components/botton-button.tsx';

const Cart = observer(() => {
    const { store } = useContext(Context);
    const total = store.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    const OpenIvoce = () => {
        navigate((`${store.getInvoceLink()}`))
    }

    return (
        <>
            <div className="rounded-3xl bg-[#99D4E6] dark:bg-[#0D0D0D] p-6 font-mulish text-[#433E9C] dark:text-white max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
                {store.cart.map((item) => (
                    <div
                        key={item.product.id}
                        className="flex items-center justify-between mb-4"
                    >
                        <div className="flex items-center">
                            <div className="rounded-3xl w-[37px] h-[37px]">
                                <img
                                    className="w-[37px] h-[37px] rounded-lg mr-4 bg-[#F6F6F6] dark:bg-[#161616]"
                                    src={item.product.image}
                                    alt={item.product.name}
                                />
                            </div>
                            <div className="ml-2">
                                <strong className="block">{item.product.name}</strong>
                                <p className="text-sm font-bold">{item.product.price} ₽</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="focus:outline-none"
                                    onClick={() => store.updateCartItemQuantity(item.product.id,item.quantity - 1)}>
                                    <AiFillMinusCircle className="w-6 h-6 text-[#E65282]"
                                    />
                            </button>
                            <span className="text-lg">{item.quantity}</span>
                            <button className="focus:outline-none"
                                    onClick={() => store.addToCart(item.product)}
                            >
                                <AiFillPlusCircle className="w-6 h-6 text-[#E65282]" />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="border-t border-gray-400 pt-4 mt-1 flex justify-between text-lg">
                    Итого:<strong>{total} ₽</strong>
                </div>
                    <BackButton onClick={goBack} />
                    <MainButton text={`Оформить заказ на ${store.totalPrice} ₽`}
                                color={'#E65282'}
                                onClick={OpenIvoce}
                    />
                    <BottomButton onClick={OpenIvoce} label='fgf'/>
            </div>
        </>
    );
});

export default Cart;
