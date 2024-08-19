import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import SearchBar from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setpaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);



  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex =  (value-1)*10;
    setpaginatedCoins(coins.slice(previousIndex,previousIndex+10));
  };

  const onSearchChange =(e) =>{
    setSearch(e.target.value);
  }

  var filteredCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    axios
      .get('API_KEY')
      .then((response) => {
        console.log("Response>>", response.data);
        setCoins(response.data);
        setpaginatedCoins(response.data.slice(0,10));
        setIsLoading(false);
      })
      .catch((error) => {
        //setError(error);
        console.log("Error>>", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
    <Header />
    <BackToTop/>
    {isLoading ? (
      <Loader/>
    ) : (
      <div>
      
      <SearchBar search={search} onSearchChange={onSearchChange} />
      <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
      {!search &&  <PaginationComponent page={page} handleChange={handlePageChange}/>}
    </div>)}
    </>
    
  );
}

export default DashboardPage;
