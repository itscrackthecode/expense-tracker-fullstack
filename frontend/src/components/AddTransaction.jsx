import React, { useState } from 'react';
import axios from 'axios';

export default function AddTransaction({refresh, userId}) {
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:8080/api/transactions/add', {
                type,
                category,
                amount: parseFloat(amount),
                date: new Date(),
                user: { id: userId }
            });
            setCategory('');
            setAmount('');
            refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to add transaction!');
        }
    };

    return (
        <div>
            <select value={type} onChange={e => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}
