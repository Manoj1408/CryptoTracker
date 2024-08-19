import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import axios from "axios";
import { coinObject } from "../funtions/coinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinData } from "../funtions/getCoinData";
import { getCoinPrices } from "../funtions/getCoinPrices";
import LineChart from "../components/Coin/LineChart";
import { convertDate } from "../funtions/convertDate";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days);
      if (prices.length > 0) {
        console.log(prices);
        setChartData({
          labels: prices.map((price) => convertDate(price[0])),
          datasets: [
            {
              data: prices.map((price) => price[1]),
              
              borderWidth: 2,
              fill: true,
              tension: 0.25,
              backgroundColor: "rgba(58, 128, 233,0.1)",
              borderColor: "#3a80e9",
              pointRadius: 0,
            }
          ]
        })
        setIsLoading(false);
      }
    }


  }
  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper">
            <LineChart chartData={chartData} />
          </div>
          <CoinInfo name={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
