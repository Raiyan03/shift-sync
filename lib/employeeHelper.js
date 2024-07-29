export const getDayName = (day) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day];
  };
  
export const formatTime = (timestamp) => {
    const tamp = parseInt(timestamp);
    const date = new Date(tamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  export const filterCurrentPreferences = (preferences, day, shiftList) => {
    if (!preferences || !day || !shiftList) {
      return;
    }
    if (preferences[day] == "any" || preferences[day] == "NA") {
      return preferences[day];
    }
    return shiftList[preferences[day]];
  }

export const formatTimeRange = (time) => {
  const timeArray = time.split(",");
  const timeFrom = formatTime(timeArray[0]);
  const timeTo = formatTime(timeArray[1]);

  return `${timeFrom} - ${timeTo}`;
}

export const filterPrefValue = (value, shiftList) => {
  if (value == "any" || value == "NA") {
    return value;
  }
  
  return `${shiftList.indexOf(value)}`;
}