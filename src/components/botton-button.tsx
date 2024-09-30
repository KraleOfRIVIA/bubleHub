import React from 'react';

interface BottomButtonProps {
  onClick: () => void; // Функция, которая вызывается при нажатии на кнопку
  label: string; // Текст, который будет отображаться на кнопке
}

const BottomButton: React.FC<BottomButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-0 left-0 w-full bg-[#E65282] text-white py-4 text-center font-bold transition duration-300 text-[12px]"
    >
      {label}
    </button>
  );
};

export default BottomButton;
