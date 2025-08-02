import { useState, useEffect } from "react";
import "../styles/TransactionAndUsers.css";

import Split from "split.js"

function TransactionAndUsers({ users, selectedTransaction, onEditTransaction, onDeleteTransaction, onAddShare, onEditShare, onDeleteShare }) {
    const [editMode, setEditMode] = useState(false);
    const [txnEdit, setTxnEdit] = useState(selectedTransaction ? { ...selectedTransaction } : null);
    const [newShare, setNewShare] = useState({ userId: "", amount: "" });

    useEffect(() => {
        Split(['#right-top', '#right-bottom'], {
            sizes: [40, 60],
            minSize: [200, 200],
            gutterSize: 6,
            snapOffset: 0,
            direction: 'vertical',
            cursor: 'row-resize'
          });
      }, []);

    useEffect(() => {
        setEditMode(false);
        setTxnEdit(selectedTransaction ? { ...selectedTransaction } : null);
    }, [selectedTransaction]);

    if (!selectedTransaction) {
        return (
            <>
                <div id="right-top" className="p-4 overflow-y-auto">
                    <div className="bg-slate-800 p-3 rounded-t-md text-emerald-400 font-semibold mb-4">Transaction Details</div>
                    <div className="p-4 bg-slate-800/60 rounded-b-md">
                        <p className="text-slate-300">Select a transaction to see details here.</p>
                    </div>
                </div>
                <div id="right-bottom" className="p-4 overflow-y-auto">
                    <div className="bg-slate-800 p-3 rounded-t-md text-emerald-400 font-semibold mb-4 flex justify-between items-center">
                        Users
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded transition text-sm">
                            + Add
                        </button>
                    </div>

                    <div className="space-y-3 bg-slate-800/60 rounded-b-md p-4">
                        {users.map((user) => (
                            <div key={user.id} className="user-item bg-slate-700/70 px-4 py-3 rounded-md flex justify-between items-center group">
                                <span>{user.name}</span>
                                <div className="space-x-2 opacity-0 group-hover:opacity-100 transition">
                                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                                    <button className="text-red-400 hover:text-red-300">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    const handleTxnEditSubmit = (e) => {
        e.preventDefault();
        onEditTransaction(selectedTransaction.id, txnEdit);
        setEditMode(false);
    };

    const handleDeleteTxn = () => {
        onDeleteTransaction(selectedTransaction.id);
    };

    const handleAddShare = (e) => {
        e.preventDefault();
        if (newShare.userId && newShare.amount) {
            const updatedShares = [
                ...(txnEdit.shares || []),
                { id: newShare.userId, amount: Number(newShare.amount) }
            ];
            onEditTransaction(selectedTransaction.id, { ...txnEdit, shares: updatedShares });
            setNewShare({ userId: "", amount: "" });
        }
    };

    const handleEditShare = (shareId, amount) => {
        const updatedShares = (txnEdit.shares || []).map(s =>
            s.id === shareId ? { ...s, amount: Number(amount) } : s
        );
        setTxnEdit({ ...txnEdit, shares: updatedShares });
    };

    const handleDeleteShare = (shareId) => {
        const updatedShares = (txnEdit.shares || []).filter(s => s.id !== shareId);
        onEditTransaction(selectedTransaction.id, { ...txnEdit, shares: updatedShares });
    };

    return (
        <>
            {!selectedTransaction ? (
                <div id="right-top" className="p-4 overflow-y-auto">
                        <div className="bg-slate-800 p-3 rounded-t-md text-emerald-400 font-semibold mb-4">Transaction Details</div>
                        <div className="p-4 bg-slate-800/60 rounded-b-md">
                            <p className="text-slate-300">Select a transaction to see details here.</p>
                        </div>
                    </div>
            ):(
                <div id="right-top" className="p-4 overflow-y-auto">
                    <div className="bg-slate-800 p-3 rounded-t-md text-emerald-400 font-semibold mb-4 flex justify-between items-center">
                        Transaction Details
                        <div className="space-x-2">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                onClick={() => setEditMode(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                onClick={handleDeleteTxn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-800/60 rounded-b-md">
                        {editMode ? (
                            <form onSubmit={handleTxnEditSubmit} className="space-y-4">
                                <div className="flex space-x-4 items-center">
                                    <div className="flex-1">
                                        <label className="block text-gray-300 text-sm mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={txnEdit.name}
                                            onChange={e => setTxnEdit({ ...txnEdit, name: e.target.value })}
                                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white w-full"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-300 text-sm mb-1">Amount</label>
                                        <input
                                            type="number"
                                            value={txnEdit.amount}
                                            onChange={e => setTxnEdit({ ...txnEdit, amount: e.target.value })}
                                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white w-full"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-1">Shares</label>
                                    <div className="space-y-2">
                                        {(txnEdit.shares || []).map(share => (
                                            <div key={share.id} className="flex items-center space-x-3 bg-slate-700/60 rounded px-3 py-2">
                                                <span className="text-sm text-gray-300 font-medium w-32">
                                                    {users.find(u => u.id === share.id)?.name || share.id}
                                                </span>
                                                <input
                                                    type="number"
                                                    value={share.amount}
                                                    onChange={e => handleEditShare(share.id, e.target.value)}
                                                    className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white w-20"
                                                />
                                                <button
                                                    type="button"
                                                    className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded transition"
                                                    onClick={() => handleDeleteShare(share.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-1">Add Share</label>
                                    <form className="flex space-x-2" onSubmit={handleAddShare}>
                                        <select
                                            value={newShare.userId}
                                            onChange={e => setNewShare({ ...newShare, userId: e.target.value })}
                                            className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white"
                                        >
                                            <option value="">Select User</option>
                                            {users
                                                .filter(u => !(txnEdit.shares || []).some(s => s.id === u.id))
                                                .map(u => (
                                                    <option key={u.id} value={u.id}>{u.name}</option>
                                                ))}
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            value={newShare.amount}
                                            onChange={e => setNewShare({ ...newShare, amount: e.target.value })}
                                            className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white w-20"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Add
                                        </button>
                                    </form>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <button type="submit" className="bg-blue-700 text-white px-3 py-1 rounded-lg">Save</button>
                                    <button type="button" className="bg-gray-600 text-white px-3 py-1 rounded-lg" onClick={() => setEditMode(false)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="mb-2">
                                    <span className="text-lg font-semibold">{selectedTransaction.name}</span>
                                    <p className="text-emerald-400 font-medium">₹ {selectedTransaction.amount}</p>
                                </div>
                                <div>
                                    <span className="text-gray-300 font-semibold">Shares:</span>
                                    <div className="mt-2 text-xs text-gray-400 space-y-1">
                                        {(selectedTransaction.shares || []).length > 0
                                            ? selectedTransaction.shares.map(s => (
                                                <div key={s.id}>
                                                    {users.find(u => u.id === s.id)?.name || s.id}: ₹{s.amount}
                                                </div>
                                            ))
                                            : <span>None</span>
                                        }
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            
            <div id="right-bottom" className="p-4 overflow-y-auto">
                <div className="bg-slate-800 p-3 rounded-t-md text-emerald-400 font-semibold mb-4 flex justify-between items-center">
                    Users
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded transition text-sm">
                        + Add
                    </button>
                </div>

                <div className="space-y-3 bg-slate-800/60 rounded-b-md p-4">
                    {users.map((user) => (
                        <div key={user.id} className="user-item bg-slate-700/70 px-4 py-3 rounded-md flex justify-between items-center group">
                            <span>{user.name}</span>
                            <div className="space-x-2 opacity-0 group-hover:opacity-100 transition">
                                <button className="text-blue-400 hover:text-blue-300">Edit</button>
                                <button className="text-red-400 hover:text-red-300">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TransactionAndUsers;