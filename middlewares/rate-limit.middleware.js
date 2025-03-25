import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `windowMs`
  message: "Rate Limit Exceeded",
  headers: true, 
});


export default limiter;