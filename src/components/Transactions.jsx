import '../styles/Transactions.css'

function Transactions( {transactions} ) {

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-200">Transactions</h2>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition">
                + Add Transaction
                </button>
            </div>
            <div className="space-y-4">
                {transactions.map((txn) => (
                    <div key={txn.id} className="transaction-item bg-slate-800/60 shadow rounded-lg p-4 flex justify-between items-center cursor-pointer">
                        <div>
                            <span className="text-lg">{txn.name}</span>
                            <p className="text-emerald-400 font-medium">₹ {txn.amount}</p>
                        </div>
                        <div className="space-x-3">
                            <button className="text-blue-400 hover:text-blue-300">Edit</button>
                            <button className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                    </div>                    
                ))}                
            </div>
        </>
    )
}

export default Transactions;