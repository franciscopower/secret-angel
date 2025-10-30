# Secret Angel 🎁

A web application for organizing Secret Santa, Secret Angel, and Secret Friend gift exchanges. Enter participants' names and emails, and the app will randomly assign gift-giving pairs and notify everyone via email.

## Screenshot

![Secret Angel Application](https://github.com/user-attachments/assets/57caffe5-4979-4d63-a0c9-969c01d24d4f)

## Features

- **Multiple Themes**: Choose between Secret Angel, Secret Santa, or Secret Friend themes
- **Dynamic Participant Management**: Add or remove participants as needed (minimum 3 participants)
- **Random Assignment**: Automatically generates random gift-giving pairs ensuring no one is assigned to themselves
- **Email Notifications**: Sends personalized emails to each participant with their assignment
- **Duplicate Detection**: Prevents duplicate participant names from being added

## Tech Stack

- **Frontend**: SvelteKit 2 with TypeScript
- **Styling**: Custom CSS
- **Email Service**: Nodemailer with Mailtrap
- **Icons**: Iconify
- **Build Tool**: Vite

## Project Structure

```
secret-angel/
├── src/
│   ├── lib/          # Shared library code and assets
│   ├── routes/       # SvelteKit routes
│   │   ├── +page.svelte       # Main page component
│   │   ├── +page.server.ts    # Server-side logic for email sending
│   │   └── +layout.svelte     # Layout component
│   └── app.html      # HTML template
├── static/           # Static assets
└── package.json      # Project dependencies and scripts
```

## How to Run Locally

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation and Running

1. Clone the repository:
   ```sh
   git clone https://github.com/franciscopower/secret-angel.git
   cd secret-angel
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. (Optional) Set up environment variables for email functionality:
   Create a `.env` file in the root directory:
   ```
   SMTP_TOKEN=your_mailtrap_token_here
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Other Available Commands

- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run check` - Run Svelte type checking

## How to Contribute

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a new branch for your feature or bug fix:
   ```sh
   git checkout -b feature/your-feature-name
   ```
   or
   ```sh
   git checkout -b fix/your-bug-fix
   ```

### Commit Guidelines

We follow conventional commit standards for clear commit history:

- `feat: add new feature` - A new feature
- `fix: resolve bug` - A bug fix
- `docs: update README` - Documentation changes
- `style: format code` - Code style changes (formatting, missing semi-colons, etc.)
- `refactor: restructure code` - Code refactoring without changing functionality
- `test: add tests` - Adding or updating tests
- `chore: update dependencies` - Maintenance tasks

Example:
```sh
git commit -m "feat: add participant email validation"
```

### Pull Request Process

1. Ensure your code follows the existing style (run `npm run lint` and `npm run format`)
2. Test your changes locally with `npm run dev`
3. Push your branch to your fork:
   ```sh
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `main` branch
5. Provide a clear description of the changes and the problem they solve
6. Wait for review and address any feedback

### GitHub Flow

We follow GitHub Flow:
1. `main` branch is always deployable
2. Create descriptive branch names
3. Commit early and often with clear messages
4. Open a PR when ready for review
5. After approval and CI passes, merge to `main`
6. Delete the feature branch after merging

## Deployment

The application can be deployed to Vercel:

### Automatic Deployment (Recommended)

If GitHub Actions are configured, the application will automatically deploy to Vercel when changes are pushed to the main branch.

### Manual Deployment

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```sh
   vercel
   ```

3. Follow the prompts to complete the deployment

### Environment Variables

Make sure to set the following environment variables in your Vercel project settings:
- `SMTP_TOKEN` - Your Mailtrap API token for email functionality

## License

This project is open source and available for personal and educational use.
