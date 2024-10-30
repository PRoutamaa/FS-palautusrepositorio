const CountryList = ( {common, clickHandler}) => {
    return (
      <p>
        {common} <button onClick={clickHandler}>show</button>
      </p>
    )
  }
export default CountryList  