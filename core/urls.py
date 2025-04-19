from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('breakrooms/', views.breakrooms, name='breakrooms'),
    path('chatroom/', views.chatroom, name='chatroom'),
    path('events/', views.events, name='events'),
    path('profile/', views.profile, name='profile'),
    path('settings/', views.settings, name='settings'),
    path('navbar/', views.navbar, name='navbar'),
    path('sidebar/', views.sidebar, name='sidebar'),
    path('notifications/', views.notifications, name='notifications'),
]
