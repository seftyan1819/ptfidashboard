import { Dayjs } from 'dayjs'
import { api } from '../helpers/api'
import type { ThreePL } from '@/entities/ThreePL'

export type Response<T> = {
  message: string
  data: T
}

export const getShipmentOfTheDay = () =>
  api.get<{
    count: number
    results: ThreePL[]
  }>('threepl-ptfi/get-shipment-of-the-day/')

export const getAggregateShipment = (filter: {
  limit: number
  offset: number
  search: string
  startDate: string
  endDate: string
}) =>
  api.get<{
    count: number
    results: ThreePL[]
  }>('threepl-ptfi/get-aggregate-shipment/', filter)

export const getCustomInProgress = (filter: {
  limit: number
  offset: number
  search: string
  filter_by: string
}) =>
  api.get<{
    count: number
    results: ThreePL[]
  }>('threepl-ptfi/get-custom-in-progress/', filter)

export const getCustomInProgressCount = () =>
  api.get<{
    receive_email_so: number;
    threepl_receive_txt_file: number;
    pick_and_post: number;
    exim_receive_supporting_document: number;
    submit_custom_clearance: number;
    analyzing_point: number;
    cleared_analyzing_point: number;
  }>(
    'threepl-ptfi/get-custom-in-progress-count/',
    null
  )

export const getCustomInProgressByProduct = (filter: {
  limit: number
  offset: number
  search: string
  filter_by: string
}) =>
  api.get<{
    count: number
    results: ThreePL[]
  }>('threepl-ptfi/get-custom-in-progress-by-product/', filter)

export const getCustomInProgressByProductCount = () =>
  api.get<{
    receive_supdoc: number;
    drafting_bc_41_ppkek: number;
    draft_bc_41_ppkek_reviewed: number;
    sppb: number;
    gate_out: number;
    permohonan_pembetulan_data_bc: number;
    skep_release: number;
    pembetulan_data_di_ceisa_ppkek: number;
    sppd: number;
  }>(
    'threepl-ptfi/get-custom-in-progress-by-product-count/',
    null
  )

export const getAnalyticCopperCathodeCount = ( filter: {
  start_date: string
  end_date: string
  types: string
}) =>
  api.get<{
    sales_order: number;
    container: number;
  }>(
    'threepl-ptfi/get-analytic-copper-cathode-count/',
    filter
  )

export const getAnalyticCopperCathodeChart = ( filter: {
  start_date: string
  end_date: string
}) =>
  api.get<{
    receive_email: number;
    threepl_receive: number;
    pick_post: number;
    exim_recive: number;
    submit_custom: number;
    analyzing_point: number;
  }>(
    'threepl-ptfi/get-analytic-copper-cathode-chart/',
    filter
  )


  export const getAnalyticByProductCount = ( filter: {
  start_date: string
  end_date: string
  types: string
}) =>
  api.get<{
    sales_order: number;
  }>(
    'threepl-ptfi/get-analytic-by-product-count/',
    filter
  )

export const getAnalyticByProductChart = ( filter: {
  start_date: string
  end_date: string
}) =>
  api.get<{
    receive_supdoc: number;
    draft_bc: number;
    gate_out: number;
    bc_skep: number;
    skep_release: number;
    ceisa_sppd: number;
  }>(
    'threepl-ptfi/get-analytic-by-product-chart/',
    filter
  )