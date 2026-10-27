import type { PropsWithChildren } from 'react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ title, isOpen, close, children }: PropsWithChildren<ModalProps>) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={evt => evt.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="mt-4 overflow-auto">{children}</div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={close}
            className="cursor-pointer rounded-full bg-indigo-600 px-5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
