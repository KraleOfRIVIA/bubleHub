import { observer } from "mobx-react-lite";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../main.tsx';
import bubble from "../public/buble-window.png"
import BottomButton from "../components/botton-button.tsx";

const SingleProduct = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store } = useContext(Context);

    const product = store.products.find((p: { id: number; }) => p.id === Number(id));

    const goBack = () => {
        navigate('/');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const cartItem = store.cart.find((item: { product: { id: number; }; }) => item.product.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="text-[#433E9C]">
            <div className="my-1 flex justify-center">
                <div className="bg-[#99D4E6] dark:bg-[#0D0D0D] rounded-3xl h-[350px] flex justify-center items-center w-screen mx-3 relative">
                    {/* Заднее изображение */}
                    <img src={bubble} alt="пузырь водки" className="absolute inset-0 w-full h-full object-cover z-0" />
    
                    {/* Переднее изображение */}
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain z-10 relative" />
                </div>
            </div>
            <div className="bg-[#99D4E6] dark:bg-[#0D0D0D] rounded-3xl h-screen">
                <div className="ml-4 mr-4">
                    <h1 className="pt-4 dark:text-white text-lg font-bold">{product.name}</h1>
                    <h2 className="text-gray-500 font-bold text-[20px]">{product.weight} мл</h2>
                    <hr className="my-2 border-gray-400 mr-1"/>
                    <div className="font-mulish text-sm dark:text-white my-4">
                        {product.description}
                    </div>
                    <hr className="my-2 border-gray-400 mr-1"/>
                    
                    {/* Маркированный список */}
                    <ul className="list-disc list-inside dark:text-white">
                        {product.ingredients && product.ingredients.length > 0 ? (
                            product.ingredients.map((ingredient: string, index: number) => (
                                <li key={index}>{ingredient}</li>
                            ))
                        ) : (
                            <li>Состав не указан</li>
                        )}
                    </ul>
                </div>
            </div>
            <BackButton onClick={goBack} />
            <BottomButton
                onClick={() => store.addToCart(product)}
                label={quantity > 0 ? `${product.price} ₽ × ${quantity}` : `${product.price} ₽`}
            />
        </div>
    );
});

export default SingleProduct;
