import dayjs from 'dayjs'

export const useCurrentTime = () => {
  const datetime = ref(dayjs());
  const updateTimeInterval = setInterval(
    () => (datetime.value = dayjs()),
    1000
  );

  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });

  return { datetime };
};
