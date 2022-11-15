import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import './SmallStockGraph.css';
import 'chartjs-adapter-moment';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

async function getStonks(ticker) {
	const response = await fetch(
		`https://yahoo-finance-api.vercel.app/${ticker}`
	);
	return response.json();
}
export default function SmallStockGraph({ ticker }) {
	const [series, setSeries] = useState([]);
	const [openPriceData, setOpenPriceData] = useState([]);
	const [chartColor, setChartColor] = useState(null);
	const [tradingPeriods, setTradingPeriods] = useState({});
	const [openPrice, setOpenPrice] = useState(null);

	// Fetch Intraday data every minute for small graph
	useEffect(() => {
		let timeoutId;
		async function getLatestPrice() {
			try {
				// fetch stock data
				const data = await getStonks(ticker);
				console.log(data);
				const stonk = data.chart.result[0];
				// Setting prices values for graphs
				const quote = stonk.indicators.quote[0];

				// Set data points for each minute
				const prices = stonk.timestamp.map((timestamp, index) => ({
					x: new Date(timestamp * 1000),
					y: quote.open[index]
				}));
				setSeries(prices);
				// open price does not change,
				// so we use open price to sure this part of the code does not run everytime we fetch for new data
				if (!openPrice) {
					// get trading period data for dashed open price
					const startTime = stonk.meta.tradingPeriods[0][0].start;
					const endTime = stonk.meta.tradingPeriods[0][0].end;
					setTradingPeriods({ startTime, endTime });
					setOpenPrice(quote.open[0]);
				}

				// Change chart color based on open and current price
				let startPrice = quote.open[0];
				let currentPrice = quote.open[quote.open.length - 1];
				if (startPrice - currentPrice < 0) {
					setChartColor('#5AC53B');
				} else setChartColor('#fd5240');
			} catch (error) {
				console.log(error);
			}

			// get new stock price every minute
			// 1000000
			timeoutId = setTimeout(getLatestPrice, 60000);
		}

		getLatestPrice();

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	// generate graph data point for open price,
	// will trigger once open price has been set
	useEffect(() => {
		const dashedData = [];
		for (
			let i = tradingPeriods.startTime;
			i <= tradingPeriods.endTime;
			i += 60
		) {
			const data = {
				x: i * 1000,
				y: openPrice
			};
			dashedData.push(data);
		}
		setOpenPriceData(dashedData);
	}, [openPrice]);

	if (!series.length && !openPrice) return null;
	return (
		<div className="LineGraph">
			<Line
				data={{
					datasets: [
						{
							type: 'line',
							data: series,
							borderColor: chartColor,
							borderWidth: 0.5,
							pointBorderColor: 'rgba(0, 0, 0, 0)',
							pointBackgroundColor: 'rgba(0, 0, 0, 0)'
						},
						{
							type: 'line',
							data: openPriceData,
							borderColor: 'black',
							borderWidth: 0.8,
							pointBorderColor: 'rgba(0, 0, 0, 0)',
							pointBackgroundColor: 'rgba(0, 0, 0, 0)',
							borderDash: [1, 4]
						}
					]
				}}
				options={{
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: false
						}
					},
					scales: {
						yAxes: {
							display: false,
							grid: {
								display: false
							}
						},
						xAxes: {
							type: 'time',
							display: false,
							grid: {
								display: false
							}
						}
					}
				}}
			/>
		</div>
	);
}
