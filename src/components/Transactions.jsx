import { useState } from 'react';
import '../styles/Transactions.css';

function Transactions({ transactions, onSelectTransaction }) {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (txn) => {
        setSelectedId(txn.id);
        if (onSelectTransaction) onSelectTransaction(txn);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Transactions</h2>
            {transactions.length === 0 && (
                <div className="text-gray-400">No transactions yet.</div>
            )}
            {transactions.map((txn) => (
                <div
                    key={txn.id}
                    className={`transaction-item bg-slate-800/60 shadow rounded-lg p-4 flex justify-between items-center cursor-pointer ${selectedId === txn.id ? 'border-2 border-emerald-400' : ''}`}
                    onClick={() => handleSelect(txn)}
                >
                    <div>
                        <span className="text-lg">{txn.name}</span>
                        <p className="text-emerald-400 font-medium">₹ {txn.amount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Transactions;