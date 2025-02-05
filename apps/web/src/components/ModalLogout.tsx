import { deleteCookie, navigate } from '@/libs/server';
import ButtonSpan from './buttons/spanButtons';
import Modal from './Modal';
import { useAppDispatch } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userslice';
import { cn } from '@/lib/utils';

interface ModalLogoutProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'aksata' | 'ristoan';
}

const ModalLogout: React.FC<ModalLogoutProps> = ({
  isOpen,
  onClose,
  type = 'ristoan',
}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    deleteCookie('access_token');
    dispatch(logoutAction());
    localStorage.clear();
    navigate('/');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ristoan={type === 'ristoan'}
      aksata={type === 'aksata'}
      backgroundClose
    >
      <div
        className={cn(
          'flex flex-col gap-3',
          type === 'ristoan' ? 'text-neutral-100' : 'text-black',
        )}
      >
        <h2 className="text-2xl font-semibold">Logout</h2>
        <p className="mb-16">are you sure you want to logout?</p>
        <div className="flex flex-row justify-end px-2 gap-6">
          <ButtonSpan type="button" ristoan onClick={onClose}>
            cancel
          </ButtonSpan>
          <ButtonSpan
            type="button"
            ristoan
            onClick={handleLogout}
            fill="bg-red-500"
          >
            log out
          </ButtonSpan>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogout;
