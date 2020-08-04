module.exports = function(config) {
    config.set({
      basePath: "",
      frameworks: ["jasmine"],
      files: [
        { pattern: "test/**/*.test.js", watched: false }
      ],
      preprocessors: {
        './test/**/*.test.js': [ 'rollup' ]
      },
      rollupPreprocessor: {
        plugins: [require('rollup-plugin-babel')({runtimeHelpers: true})],
        output: {
            format: 'iife', // Helps prevent naming collisions.
            name: 'donut-chart.js', // Required for 'iife' format.
            sourcemap: 'inline', // Sensible for testing.
        },
    },
      exclude: [],
      reporters: ["spec"],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ["Chrome", "Firefox", "Safari"],
      singleRun: true,
      concurrency: Infinity
    });
  };