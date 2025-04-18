// Dummy data for users, rooms, chats, and events
const users = [
  { id: 1, name: "Alice Johnson", status: "online", avatar: "https://source.unsplash.com/40x40/?face,1" },
  { id: 2, name: "Bob Smith", status: "offline", avatar: "https://source.unsplash.com/40x40/?face,2" },
  { id: 3, name: "Carol Lee", status: "away", avatar: "https://source.unsplash.com/40x40/?face,3" },
  { id: 4, name: "David Kim", status: "online", avatar: "https://source.unsplash.com/40x40/?face,4" },
  { id: 5, name: "Eva Green", status: "online", avatar: "https://source.unsplash.com/40x40/?face,5" }
];

const breakRooms = [
  { id: 1, name: "Coffee Lounge", category: "Social", description: "Relax and chat over coffee.", image: "https://source.unsplash.com/400x300/?coffee" },
  { id: 2, name: "Watercooler", category: "Social", description: "Casual conversations and watercooler talk.", image: "https://source.unsplash.com/400x300/?water" },
  { id: 3, name: "Book Club", category: "Interest", description: "Discuss your favorite books.", image: "https://source.unsplash.com/400x300/?books" },
  { id: 4, name: "Fitness Hub", category: "Interest", description: "Share fitness tips and workouts.", image: "https://source.unsplash.com/400x300/?fitness" },
  { id: 5, name: "Music Jam", category: "Interest", description: "Talk about music and share playlists.", image: "https://source.unsplash.com/400x300/?music" },
  { id: 6, name: "Foodie Corner", category: "Interest", description: "For food lovers and recipe sharing.", image: "https://source.unsplash.com/400x300/?food" },
  { id: 7, name: "Marketing Mavericks", category: "Team", description: "Marketing team discussions.", image: "https://source.unsplash.com/400x300/?marketing" },
  { id: 8, name: "Dev Den", category: "Team", description: "Developers' hangout.", image: "https://source.unsplash.com/400x300/?coding" },
  { id: 9, name: "Brainstorming Zone", category: "Collaboration", description: "Collaborate on ideas and projects.", image: "https://source.unsplash.com/400x300/?brainstorm" },
  { id: 10, name: "Wellness Lounge", category: "Wellness", description: "Focus on mental and physical wellness.", image: "https://source.unsplash.com/400x300/?wellness" }
];

const chats = {
  "Coffee Lounge": [
    { userId: 1, message: "Good morning everyone!", timestamp: "10:00 AM" },
    { userId: 4, message: "Morning! Ready for the coffee break?", timestamp: "10:01 AM" }
  ],
  "Watercooler": [
    { userId: 2, message: "Did you see the game last night?", timestamp: "9:30 AM" }
  ],
  // ... other chat rooms
};

const events = [
  { id: 1, title: "Monthly Town Hall", date: "2024-07-15", description: "Company-wide updates and Q&A.", rsvp: false },
  { id: 2, title: "Yoga Session", date: "2024-07-20", description: "Join us for a relaxing yoga session.", rsvp: true },
  { id: 3, title: "Book Club Meeting", date: "2024-07-25", description: "Discussing 'The Great Gatsby'.", rsvp: false }
];

// Utility functions and event listeners

// Update team list in sidebar
function updateTeamList() {
  const teamList = document.getElementById("teamList");
  if (!teamList) return;
  teamList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.className = "d-flex align-items-center mb-2";
    li.setAttribute("role", "listitem");
    li.innerHTML = `
      <img src="${user.avatar}" alt="${user.name} avatar" class="rounded-circle me-2" width="32" height="32" />
      <span>${user.name}</span>
      <span class="ms-auto">
        <i class="fas fa-circle text-${user.status === "online" ? "success" : user.status === "away" ? "warning" : "secondary"}" aria-label="${user.status}"></i>
      </span>
    `;
    teamList.appendChild(li);
  });
}

// Update break rooms cards
function updateBreakRooms() {
  const container = document.getElementById("breakRoomCards") || document.getElementById("breakRoomPreviews");
  if (!container) return;
  const searchInput = document.getElementById("breakRoomSearch");
  const categorySelect = document.getElementById("breakRoomCategory");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const category = categorySelect ? categorySelect.value : "";

  container.innerHTML = "";
  const filteredRooms = breakRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "" || room.category === category;
    return matchesSearch && matchesCategory;
  });

  filteredRooms.forEach(room => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100" role="region" aria-label="${room.name} break room">
        <img src="${room.image}" class="card-img-top" alt="${room.name} image" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${room.name}</h5>
          <p class="card-text flex-grow-1">${room.description}</p>
          <a href="chatroom.html?room=${encodeURIComponent(room.name)}" class="btn btn-primary mt-auto" aria-label="Enter ${room.name} chat room">Enter Room</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Update chat room content based on URL parameter
function updateChatRoom() {
  const params = new URLSearchParams(window.location.search);
  const roomName = params.get("room");
  const chatRoomTitle = document.getElementById("chatRoomTitle");
  const chatMessages = document.getElementById("chatMessages");
  if (!roomName || !chatRoomTitle || !chatMessages) return;

  chatRoomTitle.textContent = roomName;
  chatMessages.innerHTML = "";

  const roomChats = chats[roomName] || [];
  roomChats.forEach(chat => {
    const user = users.find(u => u.id === chat.userId);
    if (!user) return;
    const messageDiv = document.createElement("div");
    messageDiv.className = "mb-2";
    messageDiv.innerHTML = `
      <strong>${user.name}:</strong> ${chat.message} <small class="text-muted">${chat.timestamp}</small>
    `;
    chatMessages.appendChild(messageDiv);
  });
}

// Show toast notification
function showNotification(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toastId = `toast${Date.now()}`;
  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.id = toastId;
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

// Debounced search/filter for break rooms
let breakRoomSearchTimeout;
function setupBreakRoomSearch() {
  const searchInput = document.getElementById("breakRoomSearch");
  const categorySelect = document.getElementById("breakRoomCategory");
  if (!searchInput || !categorySelect) return;

  function onFilterChange() {
    clearTimeout(breakRoomSearchTimeout);
    breakRoomSearchTimeout = setTimeout(updateBreakRooms, 300);
  }

  searchInput.addEventListener("input", onFilterChange);
  categorySelect.addEventListener("change", onFilterChange);
}

// Accessibility: Keyboard shortcuts for navigation
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.altKey && !e.shiftKey && !e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case "d":
          e.preventDefault();
          htmx.ajax("GET", "dashboard.html", { target: "#main-content", swap: "innerHTML" });
          break;
        case "b":
          e.preventDefault();
          htmx.ajax("GET", "breakrooms.html", { target: "#main-content", swap: "innerHTML" });
          break;
        case "e":
          e.preventDefault();
          htmx.ajax("GET", "events.html", { target: "#main-content", swap: "innerHTML" });
          break;
        default:
          break;
      }
    }
  });
}

// Initialization on page load
document.addEventListener("DOMContentLoaded", () => {
  updateTeamList();
  updateBreakRooms();
  setupBreakRoomSearch();
  setupKeyboardShortcuts();

  if (window.location.pathname.endsWith("chatroom.html")) {
    updateChatRoom();
  }

  // Status toggle button
  const statusToggle = document.getElementById("statusToggle");
  if (statusToggle) {
    statusToggle.addEventListener("click", () => {
      const isOnline = statusToggle.getAttribute("aria-pressed") === "true";
      statusToggle.setAttribute("aria-pressed", String(!isOnline));
      statusToggle.innerHTML = isOnline
        ? '<i class="fas fa-circle text-secondary"></i> Offline'
        : '<i class="fas fa-circle text-success"></i> Online';
      showNotification(`Status changed to ${isOnline ? "Offline" : "Online"}`, "info");
    });
  }

  // Accessibility toggle button
  const accessibilityToggle = document.getElementById("accessibilityToggle");
  if (accessibilityToggle) {
    accessibilityToggle.addEventListener("click", () => {
      const isActive = accessibilityToggle.getAttribute("aria-pressed") === "true";
      accessibilityToggle.setAttribute("aria-pressed", String(!isActive));
      document.documentElement.setAttribute("data-theme", isActive ? "light" : "dark");
      showNotification(`Accessibility mode ${isActive ? "disabled" : "enabled"}`, "info");
    });
  }
});
