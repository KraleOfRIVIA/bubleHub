import React, {FC, useContext, useEffect} from 'react';

import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProductList from './pages/products-page';
import Cart from './pages/basket';
import SingleProduct from "./pages/singel-product.tsx";
import { Context } from './main.tsx';

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

const App: React.FC = () => {
    const location = useLocation();
    const { store } = useContext(Context);
    
    useEffect(() => {
        if (store.category.length === 0) {
            store.fetchProductsAndCategories();
        }
    }, []);

    return (
        <div>
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
};

export default App;
