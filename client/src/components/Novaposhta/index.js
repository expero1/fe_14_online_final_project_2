import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  MenuList,
  inputAdornmentClasses,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import getCity from '../../api/getCity';
import getWarehouses from '../../api/getWarehouses';

function NovaPoshta() {
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedCityRef, setSelectedCityRef] = useState(null);
  const [warehouseSearch, setWarehouseSearch] = useState(null);
  const [citySearch, setCitySearch] = useState(null);
  useEffect(() => {
    (async () => {
      if (selectedCity) {
        const response = await getWarehouses(selectedCityRef);
        setWarehouses(response);
        console.log(warehouses);
      }
    })();
  }, [selectedCity]);
  //   console.log(cities);
  return (
    <div>
      <TextField
        label="city"
        value={citySearch || ''}
        onChange={async ({ target }) => {
          const { value } = target;
          setCitySearch(value);
          setSelectedCity(null);
          setSelectedCityRef(null);
          if (value.length >= 3) {
            // console.log(value);
            const response = await getCity(value);
            const { data } = response;
            const { Addresses } = data[0];
            console.log(Addresses);
            setCities(
              Addresses.map(({ Present, DeliveryCity }) => ({
                name: Present,
                ref: DeliveryCity,
              }))
            );
          }
        }}
      />
      <Box>
        <List>
          {cities.map((city) => (
            <ListItemButton
              key={city.name}
              data-city={city.name}
              onClick={() => {
                setSelectedCity(city.name);
                setSelectedCityRef(city.ref);
                setCitySearch(city.name);
                setCities([]);
                setSelectedWarehouse(null);
              }}>
              <ListItem>{city.name}</ListItem>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <TextField
        label="warehouse"
        value={warehouseSearch || ''}
        onChange={(event) => {
          const { target } = event;
          const { value } = target;
          //   console.log(value);
          //   console.log(selectedWarehouse, warehouseSearch);

          setWarehouseSearch(value);
          setSelectedWarehouse(null);
        }}
      />
      <Box maxHeight="200px" overflow="scroll">
        {selectedWarehouse ? (
          <div>selected:{selectedWarehouse}</div>
        ) : (
          <List
            PaperProps={{
              style: {
                maxHeight: 20,
                width: '20ch',
              },
            }}>
            {warehouses
              .filter(
                (warehouse) =>
                  !warehouseSearch ||
                  warehouse.name
                    .toLowerCase()
                    .includes(warehouseSearch.toLowerCase())
              )
              .map((warehouse) => (
                <ListItemButton
                  key={warehouse.name}
                  data-warehouse={warehouse.name}
                  onClick={() => {
                    setSelectedWarehouse(warehouse.name);
                    setWarehouseSearch(warehouse.name);
                    setWarehouses([]);
                  }}>
                  <ListItem>{warehouse.name}</ListItem>
                </ListItemButton>
              ))}
          </List>
        )}
      </Box>
    </div>
  );
}

export default NovaPoshta;
