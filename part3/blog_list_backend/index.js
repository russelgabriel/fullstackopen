const app = require('./app') // the actual Express application
const config = require('./utils/config') // the configuration file
const logger = require('./utils/logger') // the logger

const PORT = config.PORT || 3003
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})