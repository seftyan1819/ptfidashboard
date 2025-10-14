import { Bar, Line, Pie } from 'vue-chartjs'

export type BarType = InstanceType<typeof Bar>['$props']
export type LineType = InstanceType<typeof Line>['$props']
export type PieType = InstanceType<typeof Pie>['$props']
