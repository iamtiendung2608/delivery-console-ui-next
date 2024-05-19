'use client';
import { DeliveryType } from '@/components/TransferObject/CommodityInformationComponent'

export interface Order {
  id: number
  status: OrderStatus
  totalWeight: number
  totalPrice: number
  deliveryAt: string
  estimatedDeliveryAt: string
  deliveryType: DeliveryType
  note: string
  createdAt: string
}

enum OrderStatus {
  DRAFT = 'DRAFT',
  CREATED = 'CREATED',
  RECEIVED = 'RECEIVED',
  TRANSPORTING = 'TRANSPORTING',
  TRANSPORTED = 'TRANSPORTED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED'
}