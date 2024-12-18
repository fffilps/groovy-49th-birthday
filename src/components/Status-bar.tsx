interface StatusBarProps {
    itemCount: number
  }
  
  export function StatusBar({ itemCount }: StatusBarProps) {
    return (
      <div className="border-t border-[#FF69B4] bg-[#2A0944] p-2">
        <div className="flex justify-between text-sm">
          <span>{itemCount} groovy moments</span>
          <span>Shagadelic!</span>
        </div>
      </div>
    )
  }
  
  