import { initAuthEvents } from "./events/authEvents.js";
import { initReviewEvents } from "./events/reviewEvents.js";
import { initUserEvents } from "./events/userEvents.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuthEvents();
  initReviewEvents();
  initUserEvents();
});
