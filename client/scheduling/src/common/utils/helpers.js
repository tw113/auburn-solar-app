export const convertToTimeString = (datetime, isJustTime = false, isJustAmPm = false) => {
  if (isJustAmPm) {
    return datetime.hours >= 12 ? 'PM' : 'AM';
  } else if (isJustTime) {
    return datetime
      .toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .replace(' AM', '')
      .replace(' PM', '');
  } else {
    return datetime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
};

export const convertToDayAndDate = (datetime) => {
  return datetime.toDateString();
};
