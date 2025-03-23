const cron = require('node-cron');

const initCronJobs = () => {
  // Example: Run a task every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('Running scheduled task: Daily cleanup');
      // Add your scheduled task logic here
      // For example: await cleanupService.performDailyCleanup();
    } catch (error) {
      console.error('Error in daily cleanup cron job:', error);
    }
  });

  // Example: Run a task every hour
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('Running scheduled task: Hourly update');
      // Add your scheduled task logic here
      // For example: await updateService.performHourlyUpdate();
    } catch (error) {
      console.error('Error in hourly update cron job:', error);
    }
  });

  console.log('Cron jobs initialized');
};

module.exports = initCronJobs;