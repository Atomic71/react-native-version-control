import { Button } from '@supabase/ui';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface DialogSetOpenProps {
  title: string;
  el: React.ReactElement;
}

const DialogContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function -- no need, this is default value
  setDialogOpen: (props: DialogSetOpenProps) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- no need, this is default value
  setDialogClosed: () => {},
});

export function DialogContextProvider(props: PropsWithChildren): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [element, setElement] = useState<React.ReactElement | null>(null);
  const [dialogTitle, setDialogTitle] = useState<string>('');

  const setDialogOpen = useCallback(
    ({ el, title }: { el: React.ReactElement; title: string }) => {
      setElement(el);
      setDialogTitle(title);
      setIsOpen(true);
      dialogRef.current?.showModal();
    },
    []
  );
  const setDialogClosed = useCallback(() => {
    setElement(null);
    setDialogTitle('');
    setIsOpen(false);
    dialogRef.current?.close();
  }, []);

  return (
    <DialogContext.Provider
      value={{
        setDialogOpen,
        setDialogClosed,
      }}
    >
      {props.children}
      <dialog
        className='p-4'
        ref={dialogRef}
      >
        <div className='flex justify-between'>
          <h3>{dialogTitle}</h3>
          <Button
            onClick={setDialogClosed}
            type='text'
          >
            Close
          </Button>
        </div>
        {Boolean(element) && Boolean(isOpen) && element}
      </dialog>
    </DialogContext.Provider>
  );
}

export const useDialogContext = () => useContext(DialogContext);
