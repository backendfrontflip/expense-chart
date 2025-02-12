import React, { useState, useEffect } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import logo from './images/logo.svg'
ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.day);
        const values = data.map((item) => item.amount);

        setChartData({
          labels,
          datasets: [
            {
              label: '',
              data: values,
              backgroundColor: 'hsl(10, 79%, 65%)',
              hoverBackgroundColor: 'hsl(186, 34%, 60%)',
              borderRadius: 8,
            }
          ]
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const options = {
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: () => "", // Removes the title (day name)
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  

  return (
    <>
      <div className='max-w-xl mx-auto p-5 '>
        <article className='soft-red p-8 rounded-2xl shadow flex items-center justify-between'>
          <h2 className='font-medium text-white'>My balance <span className='font-bold block text-3xl'>$921.48</span></h2>
          <img src={logo} alt="" />
        </article>
      </div>

      <div className='max-w-xl mx-auto p-5'>
       <article className='bg-white rounded-2xl '>
          <h1 className='font-bold text-2xl md:text-3xl mb-5 p-5'>Spending - Last 7 days</h1>
          {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}

          <article className='pt-8 border-t border-slate-200 flex items-center justify-between'>
            <h2 className='font-bold text-4xl p-4'><span className='text-base opacity-55 font-normal block'>Total this month</span> $478.33</h2>
            <h3 className=' pad-ding flex items-end justify-end flex-col text-base font-bold '> +2.4% <span className='font-normal block opacity-75'> from last month</span> 
            </h3>
          </article>
        </article>
      </div>

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://backendfrontflip.github.io/spacecadetio/Socials/socials.html">CodeSpace Cadet</a>.
      </div>
    </>
  );
}

export default App;
