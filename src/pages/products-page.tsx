import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductCard from '../components/product-card/product-card.tsx';
import { Context } from '../main.tsx';
import CategoryBar from "../components/navbar.tsx";
import BottomButton from '../components/botton-button.tsx';



const ProductList = observer(() => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const { category } = useParams();

    const goToCart = () => {
        navigate('/cart');
    };

    const filteredProducts = category
        ? store.products.filter((product) => product.category === category)
        : store.products;

    return (
        <>
            <CategoryBar />
            <div className="mx-10 grid grid-cols-2 md:grid-cols-4 justify-stretch gap-3">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        weight={product.weight}
                        price={product.price}
                        image={product.image}
                        onAdd={() => store.addToCart(product)}
                        isInCart={store.isProductInCart(product.id)}
                    />
                ))}
                {store.cart.length > 0 && (
                    <BottomButton
                    onClick={goToCart}
                    label={`Оформить заказ на ${store.totalPrice} ₽`}
                    />
                )}
            </div>
        </>
    );
});

export default ProductList;
