import '../styles/GroupHeader.css'

function GroupHeader( {group_name} ) {
    return (
        <header className="bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
            <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-emerald-400">{group_name}</h1>
            </div>
        </header>
    )
}

export default GroupHeader;