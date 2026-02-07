import React from 'react';
import './Button.css';

interface IButtonProps extends React.PropsWithChildren {
  type?: 'submit' | 'reset' | 'button';
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  title?: string;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  type = 'button',
  text,
  className,
  style,
  onClick,
  children,
  title,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
