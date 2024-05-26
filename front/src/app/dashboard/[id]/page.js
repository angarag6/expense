"use client"
import Navbar from '@/components/Navbar';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useState,useEffect } from 'react';
import RecordTab from '@/components/Record';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import DashboardRecord from '@/components/DashboardRecord';


const BarChart = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    const [records, setRecords] = useState();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8003/transactions?user_id=${userData.id}`);
            const fetchedRecords = response.data.map((transaction) => {
                const transactionType =
                    transaction.transaction_type === "INC" ? "INC" : "EXP";
                return {
                    transaction_type: transactionType,
                    created_at: new Date(transaction.created_at).toLocaleString(),
                    amount:
                        transactionType === "INC"   ? `+${transaction.amount}₮` : `${transaction.amount}₮`,
                    name: transaction.name,
                    description: transaction.description,  
                };
            });
    
            setRecords(fetchedRecords);
        } catch (error) {
            console.error(error);
        }
    };


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const labels = records ? records.map(record => record.created_at) : [];
    const incAmounts = records ? records.filter(record => record.transaction_type === "INC").map(record => record.amount.replace('₮','')) : [];
    const expAmounts = records ? records.filter(record => record.transaction_type === "EXP").map(record => record.amount.replace('₮','')) : [];
    console.log(incAmounts);
    console.log(expAmounts)
    const data = {
        labels:labels,
        datasets: [
            {
                label: 'Income',
                data: incAmounts,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgb(132,204,22)",
                borderWidth: 1,
            },
            {
                label: 'Expense',
                data: expAmounts,
                borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(249,115,22)",
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    return (
        <div className='px-[120px]'>
            <Navbar/>
            <h2>Monthly Sales Bar Chart</h2>
            <Bar data={data} options={options} />
            <DashboardRecord  records={records} />

        </div>
    );
};

export default BarChart;
