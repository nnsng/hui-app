import { createContext, use, useReducer, type PropsWithChildren } from 'react';

type ModalKey = 'info' | 'contribution' | 'payout';
type ModalItemState = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};
type ModalState = {
  [key in ModalKey]: ModalItemState;
};
type ContextValue = {
  state: ModalState;
  dispatch: (action: { modal: ModalKey; value: boolean }) => void;
};

const ModalContext = createContext<ContextValue | null>(null);

const initialState: ModalState = {
  info: {
    visible: false,
    onOpen: () => {},
    onClose: () => {},
  },
  contribution: {
    visible: false,
    onOpen: () => {},
    onClose: () => {},
  },
  payout: {
    visible: false,
    onOpen: () => {},
    onClose: () => {},
  },
};

const reducer = (state: ModalState, action: { modal: ModalKey; value: boolean }): ModalState => {
  const { modal, value } = action;

  const newState = Object.assign({}, state);
  newState[modal].visible = value;

  return newState;
};

export default function ModalProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>{props.children}</ModalContext.Provider>
  );
}

export function useModal(modal: ModalKey): ModalItemState {
  const context = use(ModalContext);
  if (!context) throw new Error('useModalContext must be used within a ModalProvider');

  return {
    ...context.state[modal],
    onOpen: () => context.dispatch({ modal, value: true }),
    onClose: () => context.dispatch({ modal, value: false }),
  };
}
