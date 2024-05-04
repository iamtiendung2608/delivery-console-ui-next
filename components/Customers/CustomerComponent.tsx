'use client';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { actionGetLocationTag } from '@/app/(user)/customers/add/actions'
import { SearchType } from '@/components/Location/LocationComponent'
import { actionGetCustomers, actionGetSingleCustomers } from '@/app/(user)/customers/actions'

interface LocationComponentProps {
  onLocationChange: ((customerId: number) => void) | null;
  customerId: number | null;
  label: string | null;
}

const CustomerComponent: React.FC<LocationComponentProps> = ({ onLocationChange, customerId, label}) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (customerId) {
      fetchSingleCustomers(customerId);
    }
    fetchCustomers('');
  }, [])

  const handleCustomerChange = (event, value) => {
    // onLocationChange(value.id);
    setSelectedCustomer(value);
    fetchCustomers(value);
  };

  const fetchCustomers = async (searchTerm) => {
    const response = await actionGetCustomers(searchTerm, 0);
    const data = await response;
    setCustomers(data.content);
  };

  const fetchSingleCustomers = async (customerId: number) => {
    const response = await actionGetSingleCustomers(customerId);
    const data = await response;
    setCustomers(data);
  };

  return (
    <>
      <Autocomplete
        options={customers}
        getOptionLabel={(option) => option.fullName}
        value={selectedCustomer}
        onChange={handleCustomerChange}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  )
}


export default CustomerComponent;