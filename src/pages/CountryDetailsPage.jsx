import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function CountryDetails() {

  const params = useParams()
  const [ oneCountry, setOneCountry ] = useState(null)

  const getData = async () => {
    const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${params.countryId}`)
    // console.log(response.data)
    setOneCountry(response.data)
  }

  useEffect(() => {
    getData()
  }, [params.countryId])

  if (oneCountry === null) {
    return (
      <div className="spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="container">
      <p style={{fontSize: "24px", fontWeight: "bold"}}>Country Details</p>

      <img src={`https://flagpedia.net/data/flags/icon/72x54/${oneCountry.alpha2Code.toLowerCase()}.png`} alt={oneCountry.name.common} />
      <h1>{oneCountry.name.common}</h1>

      <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{width: "30%"}}>Capital</td>
              <td>{oneCountry.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {oneCountry.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                {oneCountry.borders.map(eachBorder => {
                  return (
                    <ul key={eachBorder}>
                      <li><Link to={`/${eachBorder}`}>{eachBorder}</Link></li>
                    </ul>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </table> 
    </div>
  )
}

export default CountryDetails;
