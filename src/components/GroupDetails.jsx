import { useEffect } from 'react'

import '../styles/GroupDetails.css'

import Split from "split.js"

import Transactions from "./Transactions.jsx"
import TransactionAndUsers from "./TransactionAndUsers.jsx"

function GroupDetails( {transactions, users} ) {

    useEffect(() => {
        Split(['#transactions', '#right-pane'], {
            sizes: [70, 30],
            minSize: [400, 400],
            gutterSize: 8,
            snapOffset: 0,
            direction: 'horizontal',
            cursor: 'col-resize'
          });
      }, []);

    return (
        <div className="flex-1 flex overflow-hidden">
            <main id="transactions" className="p-6 overflow-y-auto space-y-6">
                <Transactions
                    transactions={transactions}
                />
            </main>
            <aside id="right-pane" className="w-full flex flex-col bg-slate-900/90">
                <TransactionAndUsers
                    users={users}
                />
            </aside>
        </div>   
    )
}

export default GroupDetails;