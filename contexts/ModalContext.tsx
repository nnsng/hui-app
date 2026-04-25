import { createContext, useContext, useState, type PropsWithChildren } from 'react';

export type ModalKey = 'info' | 'payment' | 'receive' | null;

type ContextValue = {
  modal: ModalKey;
  onOpenModal: (modal: ModalKey) => void;
  onCloseModal: () => void;
};

const ModalContext = createContext<ContextValue | null>(null);

export function ModalProvider(props: PropsWithChildren) {
  const [modal, setModal] = useState<ModalKey>(null);

  const onOpenModal = (modal: ModalKey) => {
    setModal(modal);
  };
  const onCloseModal = () => {
    setModal(null);
  };

  return <ModalContext value={{ modal, onOpenModal, onCloseModal }}>{props.children}</ModalContext>;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useNewModal must be used within a ModalProvider');

  return context;
}

export default ModalContext;
