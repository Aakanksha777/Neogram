import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const requiresAuth = function (request) {
  debugger;
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode(
    encodedToken,
    "any"
  );
  console.log("decodedToken", decodedToken);
  if (decodedToken) {
    const user = this.db.users.findBy({ _id: decodedToken._id });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const updatedDate = () => dayjs().format("HH:mm - DD-MM-YYYY");

// export const formatDate = (start, end) => {
//   const startDate = new Date('2022-01-01');
//   const endDate = new Date('2022-12-31');
//   const timeDiff = endDate.getTime() - startDate.getTime();
//   const randomTime = Math.random() * timeDiff;
//   const randomDate = new Date(startDate.getTime() + randomTime);
//   return randomDate.toISOString().slice(0, 10);
// }

export const formatDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  // Calculate a random time within the specified date range
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);

  // Extract day, month, and year
  const day = String(randomDate.getDate()).padStart(2, '0');
  const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = randomDate.getFullYear();

  // Construct the formatted date in the "dd-mm-yyyy" format
  return `${day}-${month}-${year}`;
}



export const currentDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let actualDate = `${day}-${month}-${year}`
  return actualDate;
}

