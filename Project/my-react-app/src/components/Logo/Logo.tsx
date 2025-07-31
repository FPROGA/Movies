import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.svg';
import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  position?: 'left' | 'center';
}

export const Logo: React.FC<LogoProps> = ({ size = 50, position = 'left' }) => {
  const navigate = useNavigate();

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