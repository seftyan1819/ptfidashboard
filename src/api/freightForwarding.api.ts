import { Dayjs } from 'dayjs'
import { api } from '../helpers/api'
import type { FreightForwarding } from '@/entities/FreightForwarding.type'

export type Response<T> = {
  message: string
  data: T
}

export type DocumentCount = {
  date: string
  outstanding: number
  completed: number
}

export const getOngoingShipmentCount = () =>
  api.get<{ bookingRequest: number; container: number }>(
    'freight-forwarding/ff/count/',
    null
  )

export const getOngoingShipments = (filter: {
  limit: number
  offset: number
  search: string
  filter_by: string
  order_by: string
}) =>
  api.get<{
    count: number
    results: FreightForwarding[]
  }>('freight-forwarding/ff/table/', filter)

export const getMonthly = () =>
  api.get<{ chart: { label: string; value: number }[]; diff: number }>(
    'freight-forwarding/ff/monthly/'
  )

export const getYearly = () =>
  api.get<{
    chart: { label: string; value: number }[]
    diff: number
  }>('freight-forwarding/ff/yearly/')

export const getByDestination = (filter: { month?: string; year?: number }) =>
  api.get<{ label: string; sum: number }[]>(
    'freight-forwarding/ff/by-destination/',
    filter
  )

export const getContainerUtilization = (type: 'daily' | 'monthly' | 'yearly') =>
  api.get<{ chart: { label: string; value: number }[]; diff: number }>(
    `freight-forwarding/ff/container-utilization/${type}/`
  )

export const getTruckUtilizationDaily = () =>
  api.get<{
    count: number
    todayCount: number
    todayResults: { tripCount: number; truckCount: number }[]
  }>('freight-forwarding/truck/utilization/')
export const getTruckUtilization = (type: 'monthly' | 'yearly') =>
  api.get<{
    chart: { vehicle_id: string; data: { label: string; value: number }[] }[]
    diff: number
  }>(`freight-forwarding/truck/utilization/${type}/`)

export const getDocuments = (
  type: 'spbb' | 'work-order',
  dateStart: Dayjs,
  dateEnd: Dayjs
) =>
  api.get<Response<DocumentCount[]>>('freight-forwarding/documents/', {
    type,
    date_start: dateStart.format('YYYY-MM-DD'),
    date_end: dateEnd.format('YYYY-MM-DD'),
  })
