# Use OpenJDK 17 with Maven
FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy pom.xml first for better dependency caching
COPY pom.xml .

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Expose the port that the application runs on
EXPOSE 8080

# Set the entry point to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "target/expense-tracker-1.0.0.jar"]
