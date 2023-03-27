import ListHeader from "@/components/ListHeader";
import { useEffect, useState } from "react";
const Main = () => {
  useEffect(() => {
    getData();
  }, []);

  const userEmail = "xavi@dev.com";

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("fetch: ", error);
    }
  };




  return (
    <>
      <div className="app">
        <ListHeader listName={"Holiday days"} />
      </div>
    </>
  );
};




export default Main;
