import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import Axios from 'axios';

const DivisionConext = React.createContext();

export function DivisionProvider(props) {
  const [ divisions, setDivisions ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ nameFilter, setNameFilter ] = useState([]);
  const [ supDivisionFilter, setSupDivisionFilter ] = useState([]);
  const [ levelFilter, setLevelFilter ] = useState([]);

  useEffect(() => {
    const cargarDivisiones = async() => {
      try {
        const response = await Axios.get('http://localhost:8000/api/divisions');
        const { data } = response;
        let newData = data.map((item, index) =>  {
          return ({
            key: index,
            name: item.name,
            level: item.level,
            employees: item.employees,
            ambassador: item.ambassador,
            superior_division: item.superior_division ? item.superior_division.name : '',
            subdivisions: item.subdivisions.length
          });
        });
        // console.log('newData', newData);
        setNameFilter(createFilter('name', newData));
        setLevelFilter(createFilter('level', newData));
        setSupDivisionFilter(createFilter('superior_division', newData));
        setDivisions(newData);
        setLoading(false);
      } catch(error) {
        console.log(error);
      }
    }
    cargarDivisiones();
  }, []);

  const createFilter = (index, items) => {
    let filter = [];
    for ( let item of items) {
      filter.push({
        text: `${item[index]}`,
        value: item[index]
      });
    }
    filter =_.uniqBy(filter, (o) => o.text);
    return filter;
  }

  const value = useMemo(() => {
    return ({
      divisions,
      loading,
      nameFilter,
      supDivisionFilter,
      levelFilter
    })
  }, [divisions, loading, nameFilter, supDivisionFilter, levelFilter ]);

  return <DivisionConext.Provider value={value} {...props} />
}

export function useDivision() {
  const context = React.useContext(DivisionConext);

  if (!context) {
    throw new Error('useDivision debe estar dentro del provider DivisionConext');
  }
  return context;
}