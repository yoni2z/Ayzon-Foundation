import React, { useEffect, useState } from "react";
import SheCanCard from "./SheCanCard";
import style from "./SheCan.module.css";
import { Link } from "react-router-dom";

function SheCan() {
  const [sheCanGrads, setSheCanGrads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cohortFilter, setCohortFilter] = useState(""); // State for cohort filter

  useEffect(() => {
    fetchTrainees();
  }, [searchTerm, cohortFilter]); // Re-fetch when searchTerm or cohortFilter changes

  const fetchTrainees = () => {
    let url = "https://ayzonfoundation.org/api/shecan/";

    // Add search term and cohort filter to the API request URL
    const params = [];
    if (searchTerm) {
      params.push(`name=${encodeURIComponent(searchTerm)}`);
    }
    if (cohortFilter) {
      params.push(`cohort=${encodeURIComponent(cohortFilter)}`); 
    }

    if (params.length) {
      url += "?" + params.join("&");
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setSheCanGrads(data))
      .catch((error) => console.error("Error fetching data", error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCohortChange = (event) => {
    setCohortFilter(event.target.value);
  };

  return (
    <>
      <div className={style.containerSc}>
        <div className={style.headerSc}>
          <h1>TRAINEES PORTFOLIO</h1>
        </div>
        <div>
          <h2 className={style.she_can_trainees}>SHE CAN TRAINEES</h2>
        </div>
        <div className={style.buttonContainer}>
          <Link to="/login" className={style.addButton}>
            Add New Trainee
          </Link>
        </div>
        <div className={style.search_container_sc}>
          <h3>FILTER RESULTS:</h3>
          <div className={style.search_fields_sc}>
            <input
              type="search"
              name="name_search"
              className="search_field"
              placeholder="SEARCH BY NAME"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              name="trainee_programs"
              id="trainee_programs"
              value={cohortFilter}
              onChange={handleCohortChange}
            >
              <option value="">SEARCH BY COHORT</option>
              <option value="1">COHORT 1</option>
              <option value="2">COHORT 2</option>
            </select>
          </div>
        </div>
        <div className={style.gradList}>
          <ul className={style.gradListUl}>
            {sheCanGrads.map((grad) => {
              return (
                <div key={grad.id}>
                  <SheCanCard
                    sheCanId={grad.id}
                    name={grad.full_name}
                    image={grad.picture}
                    description={grad.description}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SheCan;
