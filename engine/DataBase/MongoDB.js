const mongoose = require('mongoose');
const config = require('config');

module.exports = class MongoDB {

    async Connect() {
        try {
            await mongoose.connect(config.get("mongoURI"), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        } catch (err) {
            console.error(err);
            process.exit(0);
        }
    }
}