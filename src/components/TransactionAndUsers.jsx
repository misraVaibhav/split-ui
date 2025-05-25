import { useEffect } from 'react'

import "../styles/TransactionAndUsers.css"

import Split from "split.js"

function TransactionAndUsers( {users} ) { 

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
    )
}

export default TransactionAndUsers;