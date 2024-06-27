const convert12 = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    // Determine the period (AM or PM)
    const period = hours >= 12 ? "AM" : "PM";

    // Adjust the hours for 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12

    // Format the hours and minutes to be always two digits
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };