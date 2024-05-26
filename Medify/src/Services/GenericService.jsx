import moment from "moment";
import { navItems } from "../utils/constants";
import { getStates } from "./SearchService";

const getPathFromName = (name = "") => {
  return name.toLowerCase().trim().replace(/\s/g, "-");
};
export const getNavItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const states = await getStates();
      resolve(
        navItems.map((page, index) => ({
          id: index + 1,
          label: page,
          to: getPathFromName(page),
          state: { states },
        }))
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const getFormattedFutureDates = (days) => {
  const formattedDates = [];
  for (let d = 0; d < days; d++) {
    let formattedDate;
    let date = moment().add(d, "days");
    switch (d) {
      case 0:
        formattedDate = { label: "Today", date: date.toDate() };
        break;

      case 1:
        formattedDate = { label: "Tomorrow", date: date.toDate() };
        break;

      default:
        formattedDate = {
          label: date.format("ddd, D MMM"),
          date: date.toDate(),
        };
        break;
    }
    formattedDates.push(formattedDate);
  }
  return formattedDates;
};
