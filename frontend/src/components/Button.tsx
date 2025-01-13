export const Button=({onClick,children}:{onClick:()=>void,children:React.ReactNode})=>{
    return(
        <div>
            <button onClick={onClick} className="text-2xl bg-green-500 hover:bg-green-700 px-8 py-4 rounded text-white font-bold">
                {children}
            </button>
        </div>
    )
}