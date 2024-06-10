# Weather Dashboard Application

This Weather Dashboard Application provides users with up-to-date weather information and forecast by hour or day, filtered by city or location. The application is fully responsive, ensuring a seamless experience across different devices, and includes features like a favorite locations list and light/dark mode switch.

## Features

- **Weather Data**: Fetches current weather and five-day forecast from OpenWeatherMap.
- **Responsive Design**: Built with SASS under BEM methodology to ensure 100% responsiveness.
- **Pixel Perfect Design**: Utilized the pixel perfect extension to closely match the Figma design.
- **Favorites List**: Allows users to add and list favorite locations.
- **Light/Dark Mode**: Simple implementation to switch between light and dark themes.

## Technologies Used

- **React**: Component-based architecture with hooks (`useState`, `useEffect`).
- **Vite**: Fast and optimized build tool.
- **Context API**: Used to manage state and avoid prop drilling.
- **SASS**: For styling, following BEM standards.
- **OpenWeatherMap**: Source for weather data.


## Project Structure

- **Components**: Modularized into specific components for better maintainability.
- **Hooks**: Utilizes React's `useState` and `useEffect` hooks for state management and side effects.
- **Context API**: Manages global state without prop drilling.


## Installation and Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/gvonstecher/weather-dashboard-app.git
    cd weather-dashboard-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Register for OpenWeatherMap API Key**:
    - Visit the [OpenWeatherMap website](https://home.openweathermap.org/users/sign_up) and sign up for an account.
    - Generate your API key from the API keys section of your account.

4. **Create a `.env` File**:
    - In the root directory of the project, create a file named `.env`.
    - Add your OpenWeatherMap API key to the `.env` file:
        ```env
        VITE_OPENWEATHER_API_KEY=your_api_key_here
        ```

5. **Start the Development Server**:
    ```bash
    npm run dev
    ```

6. **Build for Production**:
    ```bash
    npm run build
    ```

## How to use
- **Search** your City, country, or neighborhood
- **Filter Forecast** by hour or daily
- **Save your favourite locations** and access to it later

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Credits

- **Design** is based on Weather Web Figma, which you can visit [here](https://www.figma.com/community/file/1300997022541611628)
- **Weather Info** is obtain via OpenWeatherMap [API](https://openweathermap.org/api)

---

Feel free to reach out with any questions or feedback. Enjoy using the Weather Dashboard Application!
