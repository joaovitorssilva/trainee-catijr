
interface LibraryItemProps {
  id: string;
  name: string;
  isActive: boolean;
  onClick?: () => void; 
}

export function LibraryItem({onClick}: LibraryItemProps) {
  return (
    <div
      onClick={onClick}>

    </div>
  )
}