module.exports = {
  apps: [
    {
      name: "nextjs-app-system-management-school",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}
