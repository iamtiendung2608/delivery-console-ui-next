'use server';

import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { ReportChartResponse } from '@/components/Charts/ChartThree'
import { MetricAdminResponse, MetricUserResponse } from '@/components/Dashboard/E-commerce'
import { OrderDetailResponse, OrderResponse } from '@/components/Tables/TableOne'



export async function getAdminChart(): Promise<ReportChartResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/admin/report/chart`, requestOptions);
  return await response.json();
}


export async function getUserChart(): Promise<ReportChartResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/report/chart`, requestOptions);
  return await response.json();
}


export async function getAdminMetric(): Promise<MetricAdminResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/admin/report/metric`, requestOptions);
  return await response.json();
}

export async function getUserMetric(): Promise<MetricUserResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/report/metric-user`, requestOptions);
  return await response.json();
}


export async function getAdminTop(): Promise<OrderDetailResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/admin/report/top`, requestOptions);
  return await response.json();
}

export async function getUserTop(): Promise<OrderDetailResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/report/top`, requestOptions);
  return await response.json();
}