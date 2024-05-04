'use client';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Grid } from '@mui/material';
import { actionGetLocationTag, actionGetLocationTagDetail } from '@/app/(user)/customers/add/actions'

export enum SearchType{
  DISTRICT= 'DISTRICT', PROVINCE = 'PROVINCE', WARD = 'WARD'
}

const LocationComponent = ({ onLocationChange, locationId }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect( () => {
    if (locationId) {
      // fetchLocation(locationId);
    } else {
      fetchProvinces('');
    }
  }, []);

  const fetchProvinces = async (searchTerm) => {
    try {
      const response = await actionGetLocationTag(searchTerm, SearchType.PROVINCE, '0');
      const data = await response;
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
    }
  };

  const fetchLocation = async (locationId) => {
    try {
      const response = await actionGetLocationTagDetail(locationId);
      const data = await response;
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
    }
  };

  const fetchDistricts = async (value) => {
    console.log('fetching districts:', value);
    if (value) {
      const response = await actionGetLocationTag('', SearchType.DISTRICT, `${value.id}`);
      const data = await response;
      setDistricts(data);
      setWards(data);
    }
  };

  const fetchWard = async (value) => {
    console.log('fetching districts:', value);
    if (value) {
      const response = await actionGetLocationTag('', SearchType.WARD, `${value.id}`);
      const data = await response;
      setDistricts(data);
      setWards(data);
    }
  };

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    setSelectedWard(null);
    fetchDistricts(value);
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
    fetchWard(value);
  };

  const handleWardChange = (event, value) => {
    setSelectedWard(value);
    onLocationChange(value.id);
  };

  const handleSearchInputChange = (event, value) => {
    fetchProvinces(value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            options={provinces}
            getOptionLabel={(option) => option.province}
            value={selectedProvince}
            onChange={handleProvinceChange}
            onInputChange={handleSearchInputChange} // Triggered as the user types
            renderInput={(params) => <TextField {...params} label="Province" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={districts}
            getOptionLabel={(option) => option.district}
            disabled={!selectedProvince}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            renderInput={(params) => <TextField {...params} label="District" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={wards}
            getOptionLabel={(option) => option.ward}
            disabled={!selectedProvince || !selectedDistrict}
            value={selectedWard}
            onChange={handleWardChange}
            renderInput={(params) => <TextField {...params} label="Ward" />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default LocationComponent;
