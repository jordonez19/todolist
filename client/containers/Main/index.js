import ListHeader from "@/components/ListHeader";
import ListItem from "@/components/ListItem";
import { useEffect, useState } from "react";
const Main = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const userEmail = "xavi@dev.com";

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log("fetch: ", error);
    }
  };
  console.log("data: ", data);

  //Sort by date
  const sortedTask = data?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className="app">
        <ListHeader listName={"Holiday days"} />
        {sortedTask?.map((task) => (
          <ListItem key={data.id} task={task} />
        ))}
      </div>
    </>
  );
};

export default Main;
