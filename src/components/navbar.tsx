import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../main.tsx';

const CategoryBar = () => {
    const { store } = useContext(Context);
    const location = useLocation();

    const currentPath = decodeURIComponent(location.pathname); // Декодируем путь

    return (
        <div className="my-1 w-full overflow-x-auto">
            <div className="flex space-x-4 px-4 py-2">
                {/* Ссылка на главную страницу */}
                <Link
                    to="/"
                    className={`px-2 py-2 rounded-[53px] text-black dark:text-white cursor-pointer whitespace-nowrap ${
                        currentPath === '/' ? 'bg-[#F9B8CE] text-gray-600 dark:bg-[#6E2F03]' : 'text-gray-400 dark:text-gray-400'
                    }`}
                >
                    Все напитки
                </Link>
                {/* Категории */}
                {store.category.map((category) => {
                    const isActive = currentPath === `/${category.name}`;
                    return (
                        <Link
                            key={category.name}
                            to={`/${category.name}`} 
                            className={`px-4 py-2 rounded-[53px] text-black dark:text-white cursor-pointer whitespace-nowrap ${
                                isActive ? 'bg-[#F9B8CE] text-gray-600 dark:bg-[#6E2F03]' : 'text-gray-400 dark:text-gray-400'
                            }`}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryBar;
