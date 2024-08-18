

# Shift Sync

## Overview

**Shift Sync** is an intelligent and dynamic employee scheduling solution designed to simplify the complex task of workforce management. By leveraging cutting-edge technologies like Next.js, Firebase, and OR-Tools, Shift Sync automates schedule generation based on employee preferences while allowing managers to make final adjustments with ease. Whether you need to accommodate full-time and part-time staff or prioritize supervisors, Shift Sync has you covered.

## Index

- [Video Demo](#video-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Installation](#installation)
- [Usage](#usage)
- [Microservices](#microservices)

## Video Demo


https://github.com/user-attachments/assets/e5476976-f99e-4447-b05e-c7018af8a68e


## Features

- **Employee Portal**: Employees can log in, set their working preferences, and view published schedules.
- **Manager Portal**: Managers can set available schedules, generate optimized schedules, make final adjustments, and publish the schedule.
- **Automated Scheduling**: Utilizes OR-Tools in a FastAPI microservice to create optimal schedules based on various constraints.
- **Real-Time Updates**: Firebase is used to store and update schedules in real-time as they are published.

## Tech Stack

![Untitled-2024-08-18-1604](https://github.com/user-attachments/assets/47f6fb96-65c4-4a5e-84c7-8c0b9db14adf)

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes
- **Microservice**: FastAPI (Python) with OR-Tools
- **Database**: Firebase

## System Design

![System Design](https://github.com/user-attachments/assets/851c1e58-3fb8-4f9e-bb59-85e66b5be3fa)

### System Workflow

- **Employee Portal**: Employees log in and set their working preferences.
- **Manager Portal**: Managers define available schedules.
- **Schedule Generation**: Manager clicks 'Generate,' triggering an API call to the Next.js backend.
- **Data Processing**: Next.js backend sends employee data to the FastAPI microservice.
- **Optimization**: FastAPI microservice generates an optimized schedule considering constraints.
- **Final Adjustments**: The generated schedule is returned to the frontend, where managers can make final tweaks.
- **Publishing**: Once finalized, the schedule is saved to Firebase and shared with employees in real-time.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Raiyan03/shift-sync.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```.env.local
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shift-sync.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=shift-sync
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=shift-sync.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Employee Login**: Employees log in and update their work preferences.
2. **Manager Setup**: Managers log in to view available schedules and click 'Generate' to create a new schedule.
3. **Schedule Adjustment**: Managers can adjust individual shifts before publishing.
4. **Publishing**: Finalized schedules are saved and shared with employees via Firebase.

## Microservices

Shift Sync is composed of multiple microservices. Here’s a link to the [Scheduling Microservice](https://github.com/username/scheduling-microservice), which is responsible for generating optimized schedules using OR-Tools.
