# Real-Time Multiplayer Chess Game

This project is a feature-rich web application that allows users to play chess live with others in real-time. The game is built with a user-friendly interface and robust backend logic to ensure smooth gameplay. The application is designed to be scalable, making use of multiple WebSocket servers for handling a high number of concurrent users.

---

## Features

- **Real-Time Gameplay**:
  - Establishes a persistent connection between players using WebSockets.
  - Tracks and syncs moves in real-time between players.

- **User-Friendly UI**:
  - Interactive chessboard that visually tracks moves.
  - Responsive design with Tailwind CSS for seamless usability on all devices.

- **Game Logic**:
  - Powered by the `chess.js` library for accurate and reliable chess rules and move validation.

- **Scalability**:
  - Multiple websocket servers can be integrated to manage a large number of simultaneous connections.
    
- **Backend and Frontend Integration**:
  - A robust backend for managing player connections, moves, and game sessions.
  - A modern frontend built with React.js and TypeScript for dynamic user experiences.

---

## Screenshots

![image](https://github.com/user-attachments/assets/664910d5-aa18-470f-82da-32d9fe430fc4)

![image](https://github.com/user-attachments/assets/5a11bb4a-3d94-4a74-a681-259e02995fad)

---

## Tech Stack

### Frontend
- **React.js**: Used to build the user interface.
- **Tailwind CSS**: Provides a fast and efficient way to style the application.
- **React Router DOM**: Enables smooth navigation within the application.

### Script
- **TypeScript**: Ensures type safety and better code maintainability.

### Backend
- **Node.js**: Handles backend logic and WebSocket server management.
- **WebSockets**: Establishes real-time, persistent connections for gameplay.

### Libraries
- **Chess.js**: Implements the chess game logic, including move validation and game state management.

---

## Key Learnings

Through this project, I gained valuable insights into the following:

1. **WebSocket Communication**:
   - How to establish and manage real-time persistent connections between clients and servers.
   - Handling bidirectional data flow efficiently.

2. **API Development**:
   - Creating and consuming REST APIs to handle auxiliary application data.
   - Managing asynchronous data flow using HTTP calls.

3. **Frontend-Backend Integration**:
   - Seamlessly connecting a React frontend with a Node.js backend.

4. **State Management**:
   - Using React hooks to manage and synchronize state effectively.

5. **Scalability**:
   - Designing a system that can handle concurrent users with multiple WebSocket servers.

---

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your system.
- Basic understanding of JavaScript, TypeScript, and React.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multiplayer-chess-game.git
   cd multiplayer-chess-game
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. Start the backend server:
   ```bash
   tsc -b
   node dist/index.js
   ```

4. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```
---

## Future Enhancements

1. **AI-Powered Opponent**:
   - Add an AI player to allow single-player gameplay.

2. **Matchmaking System**:
   - Implement a matchmaking algorithm to pair players of similar skill levels.

3. **Spectator Mode**:
   - Enable users to watch ongoing games in real-time.

4. **User Authentication**:
   - Add user accounts with authentication and game history tracking.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.


## Contact

For any queries or suggestions, feel free to contact me at **dhruv18gaba@gmail.com**.

