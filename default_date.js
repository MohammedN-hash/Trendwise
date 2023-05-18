  // Set the default value of 'From' to one week ago
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  document.getElementById("from").valueAsDate = fromDate;
  
  // Set the default value of 'To' to today
  const toDate = new Date();
  document.getElementById("to").valueAsDate = toDate;