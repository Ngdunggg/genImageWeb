module.exports = {
  darkMode: "class", // hoặc 'media' nếu muốn dựa trên cài đặt hệ thống
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FFFFFF", // Light theme default
          dark: "#090917", // Dark theme
        },
        bgLight: {
          DEFAULT: "#f0f0f0",
          dark: "#1C1E27",
        },
        primary: {
          DEFAULT: "#be1adb",
          dark: "#854CE6",
        },
        text_primary: {
          DEFAULT: "#111111",
          dark: "#F2F3F4",
        },
        text_secondary: {
          DEFAULT: "#48494a",
          dark: "#b1b2b3",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#171721",
        },
        card_light: {
          DEFAULT: "#FFFFFF",
          dark: "#191924",
        },
        button: {
          DEFAULT: "#5c5b5b",
          dark: "#854CE6",
        },
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};