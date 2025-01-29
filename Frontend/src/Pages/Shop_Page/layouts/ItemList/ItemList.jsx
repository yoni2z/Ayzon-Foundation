import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection";
import "./ItemList.css";

const ItemList = () => {
  const [defaultCategory, setDefaultCategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setDefaultCategory(data[0].id);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  if (defaultCategory === null) {
    return <div>Loading...</div>;
  }

  if (location.pathname === "/shop") {
    return <Navigate to={`/shop/${defaultCategory}`} replace />;
  }

  return (
    <div className="item-list-container">
      <HeroSection />
      <main className="item-list-main">
        <Outlet />
      </main>
    </div>
  );
};

export default ItemList;
