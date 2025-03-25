import rateLimit from "express-rate-limit";
import useragent from "express-useragent";

const botDetector = (req, res, next) => {
  const ua = req.useragent || useragent.parse(req.headers['user-agent']);

  if (!ua || ua.isBot) {
    return res.status(403).json({
      success: false,
      message: "Bot activity detected. Access denied.",
    });
  }

  next();
};

// Create rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  headers: true, // Include rate limit info in headers
});

// Combined middleware
const rateLimitWithBotDetection = [useragent.express(), botDetector, limiter];

export default rateLimitWithBotDetection;
