const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1280,
    viewportHeight: 1024,
    fixturesFolder: 'tests/e2e/fixtures',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    e2e: {
        baseUrl: 'http://localhost',
        supportFile: 'tests/e2e/support/index.js',
        setupNodeEvents(on, config) {
            on('task', {
                executeQuery ({ sql, values }) {
                    return dbConnection.query(sql, values);
                },
            });
        },
    },
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
        viewportWidth: 640,
        viewportHeight: 480,
    },
});