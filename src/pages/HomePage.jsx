import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function HomePage() {

  const [ countryState, setCountryState ] = useState(null)

  const getData = async () => {
    try {
      const response = await axios.get("https://ih-countries-api.herokuapp.com/countries")
      // console.log(response.data)
      setCountryState(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (countryState === null) {
    return (
      <div className="spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="container" style={{maxHeight: "90vh", overflow: scroll}}>
      <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>

      <div className="list-group">
        {countryState.map(eachCountry => {
          return (
            <div key={eachCountry.alpha2Code}>
              <Link to={`/${eachCountry.alpha3Code}`} className="list-group-item list-group-item-action">
                <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} alt={eachCountry.name} />
                {eachCountry.name.common}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage;
