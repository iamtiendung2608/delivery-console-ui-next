'use client';
import React from 'react';
import CommodityRadioComponent from '@/components/TransferObject/CommodityRadioComponent'

export enum ItemCategory {
  HIGH_VALUE = "High Value",
  FRAGILE = "Fragile",
  LIQUID = "Liquid",
  BLOCK = "Block"
}

export interface Item {
  id: number
  name: string;
  itemCategory: ItemCategory;
  quantity: number;
  weight: number;
  price: number;
}


interface ItemProps {
  item: Item;
  onChange: (updatedItem: Item) => void;
  onRemove: () => void;
}


const CommodityItem = ({ item, onChange, onRemove }: ItemProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Item) => {
    const updatedItem = { ...item, [field]: e.target.value };
    onChange(updatedItem);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Item) => {
    const updatedItem = { ...item, [field]: Number(e.target.value) };
    onChange(updatedItem);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedItem = { ...item, itemCategory: e.target.value as ItemCategory };
    onChange(updatedItem);
  };

  return (
    <div className="mb-3">
      <div className="flex gap-9 mb-5">
        <div className="flex-none w-14">
          <label className="mt-2 block text-black dark:text-white">{item.name}</label>
        </div>
        <div className="flex-initial w-full">
          <input
            type="text"
            placeholder="Input Item's name"
            value={item.name}
            onChange={(e) => handleInputChange(e, 'name')}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="flex-initial w-full">
          <select
            id="itemCategory"
            name="itemCategory"
            autoComplete="country-name"
            value={item.itemCategory}
            onChange={handleSelectChange}
            className="block w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            {Object.keys(ItemCategory).map((key) => (
              <option key={key} value={key}>
                {ItemCategory[key as keyof typeof ItemCategory]}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="flex">
        <div className="flex-none w-24">
        </div>
        <div className="grid grid-cols-4 gap-9">
          <div className="w-32">
            <label className="block text-black dark:text-white">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleNumberChange(e, 'quantity')}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="w-32 ml-8">
            <label className="block text-black dark:text-white">Weight</label>
            <input
              type="number"
              placeholder="Weight"
              value={item.weight}
              onChange={(e) => handleNumberChange(e, 'weight')}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="w-40 ml-16">
            <label className="block text-black dark:text-white">Price</label>
            <input
              type="number"
              placeholder="Item value"
              value={item.price}
              onChange={(e) => handleNumberChange(e, 'price')}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="mt-5 text-left"></div>
        <div className="mt-5 text-right">
          <button
            onClick={onRemove}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};


export default CommodityItem;