import closeButton from '../../assets/closeButton.svg';
import "./Button.css";

interface CloseButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}
export const CloseButton = ({ onClick, className = "" }: CloseButtonProps) => {

  return (
    <div 
      className={`close-button ${className}`}
      aria-label="На главную страницу"
      onClick={onClick}
    >
      <img 
        src={closeButton} 
        alt="Логотип компании"
         className="close-button-image"
      />
    </div>
  );
};
