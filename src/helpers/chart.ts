import type { ScriptableContext } from 'chart.js'

export const getGradient = (ctx: ScriptableContext<'bar'>, colors: string[]) => {
  if (!ctx.chart.chartArea) return undefined

  const yScale = ctx.chart.scales.y
  const value = ctx.raw as number
  const percentHeight = (value - yScale.min) / (yScale.max - yScale.min)
  const height = percentHeight * yScale.height
  const top = yScale.bottom - height
  const color = colors[ctx.dataIndex % colors.length]

  const gradient = ctx.chart.ctx.createLinearGradient(
    0, yScale.bottom, 0, top
  )
  gradient.addColorStop(0, '#D9D9D9')
  gradient.addColorStop(1, color)
  return gradient
}
