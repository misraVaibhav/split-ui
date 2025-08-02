import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GroupDetails.css';
import Split from "split.js";
import Transactions from "./Transactions.jsx";
import TransactionAndUsers from "./TransactionAndUsers.jsx";
import api from '../api/axios.js';

function GroupDetails({ transactions: initialTransactions, users }) {
    const { groupId } = useParams();
    const [transactions, setTransactions] = useState(initialTransactions);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

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

    // Add Transaction
    const handleAddTransaction = async (txnData) => {
        const res = await api.post(`/groups/${groupId}/transactions/`, txnData);
        setTransactions([...transactions, res.data]);
    };

    // Edit Transaction
    const handleEditTransaction = async (txnId, txnData) => {
        const res = await api.patch(`/groups/${groupId}/transactions/${txnId}`, txnData);
        setTransactions(transactions.map(txn => txn.id === txnId ? res.data : txn));
        // If the edited transaction is selected, update it in the details pane
        if (selectedTransaction && selectedTransaction.id === txnId) {
            setSelectedTransaction(res.data);
        }
    };

    // Delete Transaction
    const handleDeleteTransaction = async (txnId) => {
        await api.delete(`/groups/${groupId}/transactions/${txnId}`);
        setTransactions(transactions.filter(txn => txn.id !== txnId));
        // If the deleted transaction is selected, clear the details pane
        if (selectedTransaction && selectedTransaction.id === txnId) {
            setSelectedTransaction(null);
        }
    };

    useEffect(() => {
        setTransactions(initialTransactions);
    }, [initialTransactions]);

    return (
        <div className="flex-1 flex overflow-hidden">
            <main id="transactions" className="p-6 overflow-y-auto space-y-6">
                <Transactions
                    transactions={transactions}
                    onSelectTransaction={setSelectedTransaction}
                />
            </main>
            <aside id="right-pane" className="w-full flex flex-col bg-slate-900/90">
                <TransactionAndUsers
                    users={users}
                    selectedTransaction={selectedTransaction}
                    onEditTransaction={handleEditTransaction}
                    onDeleteTransaction={handleDeleteTransaction}
                />
            </aside>
        </div>
    );
}

export default GroupDetails;