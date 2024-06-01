import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ECommerceProps } from '@/components/Dashboard/E-commerce';
import { getAdminChart, getUserChart } from '@/app/admin/actions'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartThreeState {
  series: number[];
}

interface ReportChartData {
  count: number;
  status: string;
}

const ChartThree: React.FC<ECommerceProps> = ({ role }) => {
  const [chartData, setChartData] = useState<ReportChartData[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: 'donut'
    },
    colors: ['#10B981', '#375E83', '#259AE6'],
    labels: [],
    legend: {
      show: true,
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380
          }
        }
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200
          }
        }
      }
    ]
  });

  useEffect(() => {
    if (role) {
      (async () => {
        if (role === 'super_admin') {
          const response = await getAdminChart();
          const truncatedChartData = response.details.slice(0, 3);
          setChartData(truncatedChartData);
        } else if (role === 'user') {
          const response = await getUserChart();
          const truncatedChartData = response.details.slice(0, 3);
          setChartData(truncatedChartData);
        } else {
        }
      })();
    }
  }, [role]);

  useEffect(() => {
    const totalCount = chartData.reduce((total, data) => total + data.count, 0);
    const series = chartData.map(data => Math.round((data.count / totalCount) * 100));
    const labels = chartData.map(data => data.status);

    setChartSeries(series);
    setChartOptions(prevOptions => ({ ...prevOptions, labels }));
  }, [chartData]);

  return (
    <div
      className='col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5'>
      <div className='mb-3 justify-between gap-4 sm:flex'>
        <div>
          <h5 className='text-xl font-semibold text-black dark:text-white'>Orders Analytics</h5>
        </div>
      </div>

      <div className='mb-2'>
        <div id='chartThree' className='mx-auto flex justify-center'>
          <ReactApexChart options={chartOptions} series={chartSeries} type='donut' />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-y-3'>
        {chartData.map((data, index) => (
          <div key={index} className='flex items-center'>
            <span className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-${index % 3}`}></span>
            <p className='flex justify-between text-sm font-medium text-black dark:text-white'>
              <span>{data.status}</span>
              <span className='ml-3'>{data.count} items</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
