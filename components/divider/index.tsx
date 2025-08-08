
// components/Divider.tsx
interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ text = 'OR', className }: DividerProps) {
  return (
    <div className={`flex items-center gap-4 w-full ${className}`}>
      <div className="flex-grow border-t border-gray-300" />
      <span className="text-gray-500 text-sm">{text}</span>
      <div className="flex-grow border-t border-gray-300" />
    </div>
  );
}
