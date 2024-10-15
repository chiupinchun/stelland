import { Sprite } from '@/app/common/configs/sprites'
import React, { FC } from 'react'
import { Radar } from 'react-chartjs-2'
import { Chart, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js'

Chart.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
)

interface Props {
  sprite: Sprite
}

const StatusChart: FC<Props> = ({ sprite }) => {
  return (
    <>
      <Radar data={{
        labels: Object.keys(sprite.status),
        datasets: [{
          data: Object.values(sprite.status),
          fill: true,
          backgroundColor: 'skyblue',
          pointRadius: 0
        }]
      }} options={{
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            ticks: { display: false },
            beginAtZero: true,
            grid: { display: false }
          }
        }
      }} />
    </>
  )
}

export default React.memo(StatusChart)
