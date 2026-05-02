export const serverApi = "http://nestar-api:4000";

export const availableOptions = ["propertyBarter", "propertyRent"];

const thisYear = new Date().getFullYear();

export const propertyYears: any = [];

for (let i = 1970; i <= thisYear; i++) {
  propertyYears.push(String(i));
}

export const adminDrawerWidth = 270;

export const Messages = {
  error1: "Something went wrong!",
  error2: "Please login first!",
  error3: "Please fulfill all inputs!",
  error4: "Message is empty!",
  error5: "Only images with jpeg, jpg, png format allowed!",
};

const topPropertyRank = 50;
