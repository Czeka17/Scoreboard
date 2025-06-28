interface AlertProps {
  type: 'error' | 'success';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const isError = type === 'error';
  
  return (
    <div className={`fixed bottom-0 left-[50%] translate-x-[-50%] mb-6 p-4 rounded-lg border flex items-center gap-3 ${
      isError 
        ? 'bg-red-100 border-red-400 text-red-700' 
        : 'bg-green-100 border-green-400 text-green-700'
    }`}>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100"
        >
          X
        </button>
      )}
    </div>
  );
};