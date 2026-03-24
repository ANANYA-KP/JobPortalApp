from django.urls import path
from . import views

urlpatterns = [
    path('register/',      views.RegisterView.as_view(),             name='register'),
    path('login/',         views.LoginView.as_view(),                name='login'),
    path('verify-otp/',    views.VerifyOTPView.as_view(),            name='verify-otp'),
    path('resend-otp/',    views.ResendOTPView.as_view(),            name='resend-otp'),
    path('forgot-password/', views.PasswordResetRequestView.as_view(), name='forgot-password'),
    path('reset-password/', views.PasswordResetConfirmView.as_view(),  name='reset-password'),
    path('profile/',       views.ProfileView.as_view(),              name='profile'),
    path('',               views.UserListView.as_view(),             name='user-list'),
]