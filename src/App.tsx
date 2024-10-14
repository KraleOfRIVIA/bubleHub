import React, {FC, useContext, useEffect} from 'react';

import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProductList from './pages/products-page';
import Cart from './pages/basket';
import SingleProduct from "./pages/singel-product.tsx";
import { Context } from './main.tsx';
import { ClipLoader } from 'react-spinners';
import { observer } from 'mobx-react-lite';
import { useSwipeable } from 'react-swipeable';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';


    return (
        <motion.div
            initial={{ opacity: 0, y: isCartPage ? -100 : 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isCartPage ? 100 : -100 }}
            transition={{ duration: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const App: React.FC = observer(() => {
    const location = useLocation();
    const { store } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (store.category.length === 0) {
            store.fetchProductsAndCategories();
        }
    }, []);
    const swipe = useSwipeable({
        onSwipedLeft: () => {navigate(-1) 
        },
        onSwipedRight: () => {navigate(1)
        }
    })

    if(store.loading) {
        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                <ClipLoader size={150} />
            </div>
        );
    }

    return (
        <div {...swipe}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <PageWrapper>
                                <ProductList />
                            </PageWrapper>
                        }
                    />
                    <Route
                        path="/:category"
                        element={
                            <PageWrapper>
                                <ProductList />
                            </PageWrapper>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <PageWrapper>
                                <Cart />
                            </PageWrapper>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                        <PageWrapper>
                            <SingleProduct/>
                        </PageWrapper>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    );
});

export default App;