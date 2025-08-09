import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImageBlack from '../../assets/nav/logo/logoBlack.svg';
import logoImageWhite from '../../assets/nav/logo/logoWhite.svg';
import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  position?: 'left' | 'center';
  color: "white" | "black";
}

export const Logo: React.FC<LogoProps> = ({ size = 50, position = 'left', color = "black"}) => {
  const navigate = useNavigate();
  const logoImage = color === "white" ? logoImageWhite : logoImageBlack;
  return (
    
    <div 
      onClick={() => navigate('/')}
      className={styles.logoContainer}
      style={{ '--logo-size': `${size}px `, '--logo-position': position } as React.CSSProperties}
      aria-label="На главную страницу"
    >
      <img 
        src={logoImage} 
        alt="Логотип компании"
         className={styles.logoImage}
      />
    </div>
  );
};