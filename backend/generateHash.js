import { hash } from "bcryptjs";

const run = async () => {
  const hashedPassword = await hash("123456", 10);
  console.log(hashedPassword);
};

run();
//$2b$10$6xDwoqGbKod6WDAgS1o4FehFoN/NVSqvymzTIDiAWiAG8ylNcwITS