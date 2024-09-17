import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    scales,
} from 'chart.js';

// Register required components
ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const ClassStudentChart = () => {
    const [classData, setClassData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [genderDistribution, setGenderDistribution] = useState({ male: 0, female: 0 })

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/teachers/teachers');
                setTeachers(res.data);
            } catch (error) {
                toast.error('Error fetching teachers', error);
            }
        };

        const fetchClasses = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/classes/classes');
                setClassData(res.data);
            } catch (error) {
                toast.error('Error fetching classes', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/students/students');
                const studentData = res.data
                console.log(studentData)
                setStudents(studentData);

                const maleCount = studentData.filter(student => student.gender === "Male").length
                const femaleCount = studentData.filter(student => student.gender === "Female").length

                setGenderDistribution({ male: maleCount, female: femaleCount })
            } catch (error) {
                toast.error('Error fetching students', error);
            }
        };

        fetchTeachers();
        fetchClasses();
        fetchStudents();
    }, []);

    // Chart data for the number of students per class
    const classChartData = {
        labels: classData.map(classItem => classItem.classname),
        datasets: [
            {
                label: 'Number of Students',
                data: classData.map(classItem => classItem.students.length),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Chart data for teachers' salary distribution
    const teacherChartData = {
        labels: teachers.map(teacher => teacher.fullname),
        datasets: [
            {
                label: 'Salary Distribution',
                data: teachers.map(teacher => parseFloat(teacher.salary) || 0),
                backgroundColor: teachers.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
                borderColor: teachers.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
                borderWidth: 1
            }
        ]
    };

    // Process student data to group by year
    const yearData = students.reduce((acc, student) => {
        const year = new Date(student.dob).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});

    // Chart data for year-wise student count
    const yearChartData = {
        labels: Object.keys(yearData),
        datasets: [
            {
                label: 'Number of Students',
                data: Object.values(yearData),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    const genderChartData = {
        labels: ['Male', 'Female'],
        datasets: [{
            label: 'Gender Distribution',
            data: [genderDistribution.male, genderDistribution.female],
            backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    }

    // Options for the Bar chart
    const classChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of Students per Class',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const genderChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gender Distribution of Students',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Options for the Pie chart
    const teacherChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: $${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    // Options for the Bar chart showing year-wise student count
    const yearChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Year-Wise Student Count',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Students',
                },
            },
        },
    };

    return (
        <div className='p-4'>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-4'>Number of Students per Class</h2>
                <div className='chart-container' style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Bar data={classChartData} options={classChartOptions} />
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-4'>Teachers Salary Distribution</h2>
                <div className='chart-container' style={{ maxWidth: '350px', margin: '0 auto' }}>
                    <Pie data={teacherChartData} options={teacherChartOptions} />
                </div>
            </div>

            <div>
                <h2 className='text-2xl font-bold mb-4'>Year-Wise Student Count</h2>
                <div className='chart-container' style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Bar data={yearChartData} options={yearChartOptions} />
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-4'>Gender Distribution of Students</h2>
                <div className='chart-container' style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Bar data={genderChartData} options={genderChartOptions} />
                </div>
            </div>
        </div>
    );
};

export default ClassStudentChart;
