#!/bin/bash

# Array of service directories
services=(
  "./backend/user-service"
  "./backend/questions_service"
  "./backend/matching-service"
  "./backend/collaboration-service"
  "./frontend"
)

# Function to start a service
start_service() {
  cd "$1" || exit
  echo "Starting service in $1"
  npm install
  npm start &
  cd - || exit
}

# Start each service
for service in "${services[@]}"; do
  start_service "$service"
done

echo "All services started. Press Ctrl+C to stop all services."

# Wait for user input to keep the script running
wait