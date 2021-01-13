module.exports = function () {
    process.on('unhandledRejection', (err) => { throw err; });

    process.on('uncaughtException', (err) => {
        console.error(err.message, err);
        process.exit(2);
    });
}
