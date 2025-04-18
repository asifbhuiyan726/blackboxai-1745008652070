from django.shortcuts import render

# Dummy data
break_rooms = [
    {"id": 1, "name": "Coffee Lounge", "category": "Social", "description": "Relax and chat over coffee.", "image": "https://source.unsplash.com/400x300/?coffee"},
    {"id": 2, "name": "Watercooler", "category": "Social", "description": "Casual conversations and watercooler talk.", "image": "https://source.unsplash.com/400x300/?water"},
    {"id": 3, "name": "Book Club", "category": "Interest", "description": "Discuss your favorite books.", "image": "https://source.unsplash.com/400x300/?books"},
    {"id": 4, "name": "Fitness Hub", "category": "Interest", "description": "Share fitness tips and workouts.", "image": "https://source.unsplash.com/400x300/?fitness"},
    {"id": 5, "name": "Music Jam", "category": "Interest", "description": "Talk about music and share playlists.", "image": "https://source.unsplash.com/400x300/?music"},
    {"id": 6, "name": "Foodie Corner", "category": "Interest", "description": "For food lovers and recipe sharing.", "image": "https://source.unsplash.com/400x300/?food"},
    {"id": 7, "name": "Marketing Mavericks", "category": "Team", "description": "Marketing team discussions.", "image": "https://source.unsplash.com/400x300/?marketing"},
    {"id": 8, "name": "Dev Den", "category": "Team", "description": "Developers' hangout.", "image": "https://source.unsplash.com/400x300/?coding"},
    {"id": 9, "name": "Brainstorming Zone", "category": "Collaboration", "description": "Collaborate on ideas and projects.", "image": "https://source.unsplash.com/400x300/?brainstorm"},
    {"id": 10, "name": "Wellness Lounge", "category": "Wellness", "description": "Focus on mental and physical wellness.", "image": "https://source.unsplash.com/400x300/?wellness"},
]

recent_activity = [
    {"id": 1, "text": "Alice joined Coffee Lounge", "timestamp": "10:00 AM"},
    {"id": 2, "text": "Bob posted a message in Dev Den", "timestamp": "9:45 AM"},
    {"id": 3, "text": "Carol RSVP'd to Yoga Session", "timestamp": "9:30 AM"},
]

upcoming_events = [
    {"id": 1, "title": "Monthly Town Hall", "date": "2024-07-15", "description": "Company-wide updates and Q&A."},
    {"id": 2, "title": "Yoga Session", "date": "2024-07-20", "description": "Join us for a relaxing yoga session."},
    {"id": 3, "title": "Book Club Meeting", "date": "2024-07-25", "description": "Discussing 'The Great Gatsby'."},
]

def index(request):
    return render(request, 'index.html')

def dashboard(request):
    context = {
        "break_rooms": break_rooms,
        "recent_activity": recent_activity,
        "upcoming_events": upcoming_events,
    }
    return render(request, 'dashboard.html', context)

def breakrooms(request):
    context = {
        "break_rooms": break_rooms,
    }
    return render(request, 'breakrooms.html', context)

# Additional dummy data for chatroom
users = [
    {"id": 1, "name": "Alice Johnson", "avatar": "https://source.unsplash.com/40x40/?face,1", "status": "online"},
    {"id": 2, "name": "Bob Smith", "avatar": "https://source.unsplash.com/40x40/?face,2", "status": "offline"},
    {"id": 3, "name": "Carol Lee", "avatar": "https://source.unsplash.com/40x40/?face,3", "status": "away"},
    {"id": 4, "name": "David Kim", "avatar": "https://source.unsplash.com/40x40/?face,4", "status": "online"},
    {"id": 5, "name": "Eva Green", "avatar": "https://source.unsplash.com/40x40/?face,5", "status": "online"},
]

chats = {
    "Coffee Lounge": [
        {"user_id": 1, "message": "Good morning everyone!", "timestamp": "10:00 AM"},
        {"user_id": 4, "message": "Morning! Ready for the coffee break?", "timestamp": "10:01 AM"},
    ],
    "Watercooler": [
        {"user_id": 2, "message": "Did you see the game last night?", "timestamp": "9:30 AM"},
    ],
    # ... other chat rooms
}

def chatroom(request):
    room_name = request.GET.get("room", "Coffee Lounge")
    room_chats = chats.get(room_name, [])
    chat_messages = []
    for chat in room_chats:
        user = next((u for u in users if u["id"] == chat["user_id"]), None)
        if user:
            chat_messages.append({
                "user_name": user["name"],
                "user_avatar": user["avatar"],
                "message": chat["message"],
                "timestamp": chat["timestamp"],
                "user_status": user["status"],
            })
    context = {
        "room_name": room_name,
        "chat_messages": chat_messages,
        "users": users,
    }
    return render(request, "chatroom.html", context)

def events(request):
    context = {
        "upcoming_events": upcoming_events,
    }
    return render(request, 'events.html', context)

def profile(request):
    user_profile = {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "bio": "Enthusiastic team player and coffee lover.",
        "avatar": "https://source.unsplash.com/80x80/?face,1",
    }
    context = {
        "user_profile": user_profile,
    }
    return render(request, "profile.html", context)

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def settings(request):
    user_settings = {
        "notify_status_changes": True,
        "notify_profile_updates": True,
        "notify_rsvps": True,
        "language": "en",
        "theme": "light",
    }
    if request.method == "POST":
        # Check if request is from HTMX
        if request.headers.get("HX-Request"):
            # Process form data (simulate saving settings)
            notify_status_changes = request.POST.get("notify_status_changes") == "on"
            notify_profile_updates = request.POST.get("notify_profile_updates") == "on"
            notify_rsvps = request.POST.get("notify_rsvps") == "on"
            language = request.POST.get("language", "en")
            theme = request.POST.get("theme", "light")

            # Update user_settings dict (in real app, save to DB)
            user_settings.update({
                "notify_status_changes": notify_status_changes,
                "notify_profile_updates": notify_profile_updates,
                "notify_rsvps": notify_rsvps,
                "language": language,
                "theme": theme,
            })

            # Return success message partial for HTMX
            return HttpResponse(
                '<div class="alert alert-success" role="alert">Settings updated successfully!</div>'
            )
        else:
            # Non-HTMX POST fallback (optional)
            # Here you could redirect or render full page
            pass

    context = {
        "user_settings": user_settings,
    }
    return render(request, "settings.html", context)
