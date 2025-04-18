
Built by https://www.blackbox.ai

---

```markdown
# BreakSpace - Hybrid Work Platform

BreakSpace is a hybrid work platform designed to facilitate communication and collaboration between team members in a digital space. It features tools for managing break rooms, events, and chat rooms, enhancing the overall hybrid working experience.

## Project Overview

BreakSpace serves as a central hub for teams to relax, socialize, and collaborate. Users can join various break rooms, chat with team members, and stay updated on upcoming events. The platform integrates real-time interactions with a clean, responsive design and supports accessibility features.

## Installation

To set up the BreakSpace platform locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd breakspace
   ```

2. **Open the `index.html`**:
   Open `index.html` in your preferred web browser to view the application.

No additional installations are required as it uses CDN links for dependencies.

## Usage

1. **Navigation**:
   Use the navigation bar to access different sections like Dashboard, Break Rooms, and Events.
   
2. **Break Rooms**:
   Explore available break rooms categorized by interests and socialize with your team.

3. **Chat Rooms**:
   Join a chat room to communicate with your team members in real time.

4. **Manage Events**:
   Check upcoming events and RSVP for those that interest you.

5. **Profile Settings**:
   Update your profile details through the settings modal when logged in.

## Features

- **Dynamic Navigation**: Lightweight and responsive navigation structure utilizing HTMX for content swapping.
- **Break Room Management**: Search and filter through break rooms by category.
- **Live Chat Functionality**: Participate in chat rooms and view chat histories.
- **Toast Notifications**: Real-time notifications for status changes and events.
- **Accessibility Options**: Toggle options for high contrast mode and status visibility.

## Dependencies

The project relies on the following libraries:
- **Bootstrap 5**: For styling and responsive layout.
- **Font Awesome**: For icons.
- **HTMX**: For seamless HTML request handling.

These dependencies are included via CDN links in the `index.html` file.

## Project Structure

Here is an outline of the key files and directories in the project:

```
/breakspace
│
├── index.html          # Main entry point for the application
├── navbar.html         # Navbar HTML including navigation links
├── sidebar.html        # Sidebar for displaying team members and navigation
├── notifications.html   # Layout for notifications
├── dashboard.html      # Dashboard overview displaying break rooms and activities
├── breakrooms.html     # Break Rooms section with search and filters
├── chatroom.html       # Individual chat room layout
├── events.html         # Events section displaying upcoming events
├── profile.html        # Modal for user profile management
├── settings.html       # Modal for application settings
├── styles.css          # Custom CSS for styling the application
├── scripts.js          # JavaScript for interactive functionality
└── ...
```

### Note on Dynamic Content

This application loads dynamic content (like team members, break rooms, and chat messages) using JavaScript. The dummy data is contained within `scripts.js`, which can be expanded for real data integration as needed.

## License

This project is open-source and available under the [MIT License](LICENSE).
```