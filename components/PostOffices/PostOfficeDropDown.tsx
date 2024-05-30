'use client'
import { Autocomplete, TextField, CircularProgress, Grid } from '@mui/material';


import { useEffect, useState } from 'react'
import { actionGetPostOfficesWithSize } from '@/app/(user)/post-offices/actions'

const PostOfficesDropDownComponent = ({ onLocationChange }) => {
  const [offices, setOffices] = useState([]);

  useEffect( () => {
    fetchPostOffices('');
  }, []);

  const fetchPostOffices = async (searchTerm) => {
    try {
      const response = await actionGetPostOfficesWithSize(searchTerm, 0);
      const data = await response;
      setOffices(data.content);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
    }
  };

  const handleSelected = (event, value) => {
    onLocationChange(value.id);
  };

  const handleSearchInputChange = (event, value) => {
    fetchPostOffices(value);
  };

  return (
    <>

    </>
  )
}

export default PostOfficesDropDownComponent;