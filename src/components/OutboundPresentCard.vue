<script setup lang="ts">
  import svgSignOut from '@/assets/icon/vaadin_sign-out-alt.svg'
  import type { LineType } from '@/types/chartjs';
  import { Line } from 'vue-chartjs';

  const outboundData = {
    labels: [...Array(30).keys()].map(i => i + 1),
    datasets: [
      {
        label: 'Outbound Factory',
        data: [15, 16, 14, 15, 15,
               15, 15, 15, 15, 15,
               15, 16, 16, 19, 19].map(i => i * 100),
        borderColor: '#118dff',
      },
      {
        label: 'Outbound 3PL',
        data: [16, 15, 15, 15, 15,
               15, 15, 20, 15, 15,
               15, 16, 29, 20, 17].map(i => i * 100),
        borderColor: '#12239e',
      },
    ],
  }
  const outboundOptions: LineType['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  const comparisonPercentage = [5, -5]
</script>

<template>
  <VCard class="pa-2" :elevation="4">
    <div class="d-flex pa-2">
      <div>
        <div class="primary-shadow pa-2 rounded-xl">
          <VImg :src="svgSignOut" :width="24" />
        </div>
      </div>
      <div class="mt-2 ml-4 text-decoration-underline font-weight-bold">
        Outbound Present
      </div>
      <VSpacer />
      <div class="text-left text-body-2">
        <div class="text-secondary font-weight-bold">COMPARISON</div>
        <table>
          <tbody>
            <tr v-for="data, idx in outboundData.datasets" :key="idx">
              <td>
                <span
                  class="rounded-circle mr-1"
                  :style="{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    backgroundColor: data.borderColor,
                  }"
                />
              </td>
              <td>{{ data.label }}</td>
              <td>
                <VChip
                  class="mx-1"
                  :color="comparisonPercentage[idx] >= 0 ? 'primary' : 'error'"
                  density="compact"
                  rounded="pill"
                  size="small"
                  :text="(comparisonPercentage[idx] > 0 ? '+' : '') + comparisonPercentage[idx] + '%'"
                />
                <span class="text-outline text-caption">vs last day</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="chart-wrapper">
      <Line :data="outboundData" :options="outboundOptions" />
    </div>
  </VCard>
</template>

<style lang="sass" scoped>
  .chart-wrapper
    height: 200px
</style>
