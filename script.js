const timeTrackingOptions = document.querySelectorAll("#time-tracking-options .option");
const timeTrackers = document.querySelectorAll(".time-tracker");

let optionType;

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  timeTrackingOptions[1].click();
});

// Attach event listeners to tracking options
timeTrackingOptions.forEach((option) => {
  option.addEventListener("click", async () => {
    updateActiveOption(option);
    optionType = option.getAttribute("data-option");
    await updateTimeTrackers(optionType);
  });
});

// Updates active class for selected option
function updateActiveOption(selectedOption) {
  timeTrackingOptions.forEach((option) => option.classList.remove("active"));
  selectedOption.classList.add("active");
}

// Fetch and update all time tracker elements
async function updateTimeTrackers(optionType) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    timeTrackers.forEach((tracker) => {
      const category = tracker.getAttribute("data-category");
      const categoryData = data.find((item) => item.title === category);
      

      const currentHours =
        categoryData.timeframes?.[optionType]?.current || 0;
      const previousHours =
        categoryData.timeframes?.[optionType]?.previous || 0;

      tracker.querySelector(
        ".time span.hours"
      ).textContent = `${currentHours}hrs`;
      tracker.querySelector(
        ".time span.previous-hours"
      ).textContent = `Last ${(optionType === "daily" ? "Day": "weekly"? "Week": "Month")} - ${previousHours}hrs`;
    });
  } catch (error) {
    console.error("Error fetching time tracking data:", error);
  }
}