import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiUrlPrefix, geoApiUrlSuffix } from "../../forApi";

const Find = ({ onFindChange }) => {
  const [find, setFind] = useState(null);

  const loadPlaces = (inputCity) => {
    return fetch(
      `${geoApiUrlPrefix}${inputCity}
      ${geoApiUrlSuffix}`
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.features.map((location) => {
            return {
              value: `${location.properties.lat} ${location.properties.lon}`,
              label: `${location.properties.formatted}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const respondOnChange = (findData) => {
    setFind(findData);
    onFindChange(findData);
  };

  return (
    <AsyncPaginate
      placeholder="Enter city"
      debounceTimeout={600}
      value={find}
      onChange={respondOnChange}
      loadOptions={loadPlaces}
    />
  );
};

export default Find;
