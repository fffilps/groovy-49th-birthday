interface HeaderProps {
    title: string
    email: string
  }
  
  export function Header({ title, email }: HeaderProps) {
    return (
      <div className="border-b border-[#FF69B4] bg-[#2A0944] p-2">
        <div className="flex items-center">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF69B4]" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <h1 className="font-bold text-xl" style={{ fontFamily: "'Groovy', cursive" }}>
              {title}
            </h1>
          </div>
          <div className="text-sm text-[#FF69B4]">{email}</div>
        </div>
      </div>
    )
  }
  
  