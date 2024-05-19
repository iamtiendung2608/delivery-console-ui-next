'use client';

import { date } from 'yup'
import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CheckboxFive from '@/components/Checkboxes/CheckboxFive'
import CommodityItem, { Item } from '@/components/TransferObject/CommodityItem'
import CommodityRadioComponent from '@/components/TransferObject/CommodityRadioComponent'
import SelectComponent from '@/components/Select/SelectComponent'

export interface CreateOrderRequest {
  id: number
  deliveryType: DeliveryType
  note: string
  paidType: PaidType
  status: OrderStatus
  senderObjectId: number
  receiverObjectId: number
  items: Item[]
}

export interface CreateOrderResponse {
  message: string
  error: boolean
}

export enum DeliveryType {
  FAST = 'FAST',
  NORMAL = 'NORMAL'
}

export enum PaidType {
  SENDER = 'SENDER', RECEIVER = 'RECEIVER'
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  CREATED = 'CREATED',
  SENT = 'SENT',
  TRANSPORTED = 'TRANSPORTED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED'
}


const CommodityInformationComponent: FC<{ id: number | null, editAction: boolean}> = ({ id, editAction }) => {
  return (
    <>

    </>
  )
}


function getEnumKeys<
  T extends string,
  TEnumValue extends string | number,
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>
}


export default CommodityInformationComponent;
