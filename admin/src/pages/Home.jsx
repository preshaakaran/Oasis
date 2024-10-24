import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import booking from '../assets/booking.png';
import calendar from '../assets/calendar.png';
import sales from '../assets/sales.png';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    CartesianGrid,
    LineChart,  
    Line
} from "recharts";

const Home = () => {
    const [allreservations, setALLReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/booking/list`);
            setALLReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const colors =  {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }

    const calculateTotalSales = () => {
        return allreservations.reduce((total, reservation) => {
            return total + (reservation.cabinPrice * reservation.numNights) + reservation.breakFastPrice;
        }, 0);
    };

    const totalSales = calculateTotalSales();

    const calculateCheckOut = () => {
        return allreservations.filter(reservation => new Date(reservation.endDate) < new Date()).length;
    };

    const checkedOutCount = calculateCheckOut();

    // Prepare data for Pie Chart
    const preparePieChartData = () => {
        const initialData = [
            { duration: "1 night", value: 0, color: "#ef4444" },
            { duration: "2 nights", value: 0, color: "#f97316" },
            { duration: "3 nights", value: 0, color: "#eab308" },
            { duration: "4-5 nights", value: 0, color: "#84cc16" },
            { duration: "6-7 nights", value: 0, color: "#22c55e" },
            { duration: "8-14 nights", value: 0, color: "#14b8a6" },
            { duration: "15-21 nights", value: 0, color: "#3b82f6" },
            { duration: "21+ nights", value: 0, color: "#a855f7" },
        ];

        allreservations.forEach(reservation => {
            const nights = reservation.numNights;

            if (nights === 1) initialData[0].value += 1;
            else if (nights === 2) initialData[1].value += 1;
            else if (nights === 3) initialData[2].value += 1;
            else if (nights >= 4 && nights <= 5) initialData[3].value += 1;
            else if (nights >= 6 && nights <= 7) initialData[4].value += 1;
            else if (nights >= 8 && nights <= 14) initialData[5].value += 1;
            else if (nights >= 15 && nights <= 21) initialData[6].value += 1;
            else if (nights > 21) initialData[7].value += 1;
        });

        return initialData;
    };

    const data = preparePieChartData();

    const calculateSalesByDate = () => {
        const salesData = {};
    
        allreservations.forEach(reservation => {
            const currentDate = new Date(reservation.currentDate).toDateString();
            const totalSale = (reservation.cabinPrice * reservation.numNights) + reservation.breakFastPrice;
    
            if (!salesData[currentDate]) {
                salesData[currentDate] = { totalSales: 0, extrasSales: 0 };
            }
            salesData[currentDate].totalSales += totalSale;
            // If you have extras price, add it to extrasSales here, e.g.
            salesData[currentDate].extrasSales += reservation.extrasPrice || 0; // Modify according to your data structure
        });
    
        // Convert salesData object to array
        return Object.keys(salesData).map(date => ({
            label: date,
            totalSales: salesData[date].totalSales,
            extrasSales: salesData[date].extrasSales,
        }));
    };

    const salesData = calculateSalesByDate();   

    return (
        <div className='flex text-white h-[100vh] w-[100vw]' style={{ backgroundColor: '#141c24' }}>
            <Sidebar />
            <div className='w-[75vw] p-5 overflow-y-auto scrollbar-hidden'>
                <div className='text-3xl font-bold p-2 ml-3'>Dashboard</div>
                <div className='container mt-10 w-[70vw] flex'>
                    <div className='bg-gray-800 rounded-xl m-5 flex p-5 w-[20vw]'>
                        <img src={booking} alt='logo' className='w-18 h-18 object-cover rounded-full mr-5' />
                        <div>
                            <span className='text-3xl font-bold pr-4'>Bookings</span>
                            <div className='text-2xl'>{allreservations.length}</div>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-xl m-5 flex p-5 w-[20vw]'>
                        <img src={sales} alt='logo' className='w-16 h-16 object-cover rounded-full mr-5 p-1 mt-1' />
                        <div>
                            <span className='text-3xl font-bold pr-8 mr-5'>Sales</span>
                            <div className='text-2xl'>${totalSales > 0 ? totalSales : <span>0</span>}</div>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-xl m-5 flex p-5 w-[20vw]'>
                        <img src={calendar} alt='logo' className='w-20 h-20 object-cover rounded-full mr-5' />
                        <div>
                            <span className='text-3xl font-bold'>Check out</span>
                            <div className='text-2xl'>{checkedOutCount}</div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-800 rounded-xl p-5 m-5 w-[65vw]'>
                    <div>
                    <h2 className='text-2xl font-bold mb-4'>Sales Summary</h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={data}
                                nameKey="duration"
                                dataKey="value"
                                innerRadius={85}
                                outerRadius={110}
                                cx="40%"
                                cy="50%"
                                paddingAngle={3}
                            >
                                {data.map((entry) => (
                                    <Cell fill={entry.color} key={entry.duration} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="middle"
                                align="right"
                                width="30%"
                                layout="vertical"
                                iconSize={15}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    </div>
                </div>
                <div className='bg-gray-800 rounded-xl p-5 m-5 w-[65vw]'>
                    <div>
                    <h2 className='text-2xl font-bold mb-4'>Stay Duration Summary</h2>
                    <ResponsiveContainer height={300} width="100%">
    <AreaChart data={salesData}>
        <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
        <YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
        <CartesianGrid strokeDasharray="4" />
        <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
        />
        <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
        />
    </AreaChart>
</ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
