import Auth from "@/components/Auth";
import ListHeader from "@/components/ListHeader";
import ListItem from "@/components/ListItem";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Main = () => {
  const [data, setData] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [loading, setLoading] = useState(false);
  const userEmail = cookies.Email;
  const AuthToken = cookies.AuthToken;

  useEffect(() => {
    if (!!AuthToken) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("fetch: ", error);
    }
  };

  //Sort by date
  const sortedTask = data?.sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <>
      <div className="app">
        {!AuthToken && <Auth />}
        {AuthToken && (
          <>
            {!loading && <ListHeader listName={"Holidays"} getData={getData} />}
            {loading && <Loading />}
            {!loading &&
              sortedTask &&
              sortedTask.map((task) => (
                <ListItem key={task.id} task={task} getData={getData} />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default Main;
