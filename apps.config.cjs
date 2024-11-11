module.exports = {
  apps: [{
      name: "unifier-dev",
      script: "./build/performance-snapshot.cjs",
      args: "--settings ./unifier-dev.yaml"
    },
    {
      name: "unifier-prod",
      script: "./build/performance-snapshot.cjs",
      args: "--settings ./unifier-prod.yaml"
    }
  ]
}