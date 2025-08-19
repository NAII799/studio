# Amadeus Altea DCS - Training Simulator

This is a Next.js project for a flight check-in simulator designed for educational purposes. It uses Genkit and Google AI to provide explanations for each step of the process.

---

## How to Run the Project Locally (on your computer)

To run the project, you need to run two commands in two separate terminals.

**1. Run the App Server:**
This runs the user interface and all the screens.

```bash
npm run dev
```
The application will be available at `http://localhost:9002`.

**2. Run the AI Server:**
This runs the Genkit AI models that provide the educational explanations.

```bash
npm run genkit:watch
```
**Important:** Both terminals must remain open while you are working on the project.

---

## How to Deploy the Project Online (Publish to the Internet)

Follow these steps to publish your project on Firebase Hosting, which offers a generous free plan. This will make your project available online 24/7 from any device.

### Step 1: Get Your Google AI API Key

The AI features in this project require an API key to work online.

1.  Go to [**Google AI Studio**](https://aistudio.google.com/app/apikey).
2.  Click **"Create API key in new project"**.
3.  **Copy the key** that appears. It will be a long string of letters and numbers.

### Step 2: Add the API Key to Your Project

You need to tell your project what the API key is.

1.  Open the `.env` file in your project.
2.  Paste your copied API key into the file like this:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    (Replace `YOUR_API_KEY_HERE` with the actual key you copied).

### Step 3: Install Firebase Tools

Open a terminal and run this command once to install the necessary tools.

```bash
npm install -g firebase-tools
```

### Step 4: Log in and Deploy

Now you will connect your project to Firebase and publish it.

1.  **Log in to your Google account:**
    ```bash
    firebase login
    ```
    A browser window will open. Log in with your Google account and grant permissions.

2.  **Initialize Firebase Hosting:**
    ```bash
    firebase init hosting
    ```
    The terminal will ask you some questions. Answer them exactly like this:
    *   `Use an existing project` (select the Firebase project you want to use).
    *   `What do you want to use as your public directory?` -> **out**
    *   `Configure as a single-page app (rewrite all urls to /index.html)?` -> **No**
    *   `Set up automatic builds and deploys with GitHub?` -> **No**

3.  **Build the project for production:**
    This command prepares your project files for the internet.
    ```bash
s   npm run build
    ```

4.  **Deploy to Firebase!**
    This is the final step. It uploads your project to the internet.
    ```bash
    firebase deploy --only hosting
    ```

After this command finishes, it will give you a **Hosting URL** (like `https-your-project-name.web.app`).

**Congratulations! Your project is now live on the internet!**
