import { useMutation } from '@tanstack/react-query';
import closeButton from '../../assets/closeButton.svg';
import "./Button.css";
import { useNavigate } from "react-router-dom";
import { stopUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const CloseButton = () => {
  const logoutMutation = useMutation(
    {
      mutationFn: () => stopUser(),
      onSuccess() {
         queryClient.clear();
         window.location.reload();
      },
    },
    queryClient
  );
    const navigate = useNavigate();
    const exit = () =>{
      navigate('/');
      logoutMutation.mutate();
    }
  return (
    <div 
      onClick={() => {exit} }
      className="close-button"
      aria-label="На главную страницу"
    >
      <img 
        src={closeButton} 
        alt="Логотип компании"
         className="close-button-image"
      />
    </div>
  );
};
