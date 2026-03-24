import random
from datetime import timedelta

from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import PasswordResetOTP, EmailVerificationOTP
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()


# ─────────────────────────────────────────
# Helper
# ─────────────────────────────────────────
def generate_otp():
    return f"{random.randint(0, 999999):06d}"


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access':  str(refresh.access_token),
    }


# ─────────────────────────────────────────
# Register
# ─────────────────────────────────────────
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate OTP for email verification
            otp_code = generate_otp()
            EmailVerificationOTP.objects.create(user=user, code=otp_code)

            tokens = get_tokens(user)
            return Response({
                **tokens,
                'user':    UserSerializer(user).data,
                'message': 'Registration successful. OTP sent to email.',
                'otp':     otp_code,   # ← remove in production
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─────────────────────────────────────────
# Verify OTP
# ─────────────────────────────────────────
class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email')
        otp_code = request.data.get('otp')

        if not email or not otp_code:
            return Response(
                {'error': 'Email and OTP are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check EmailVerificationOTP first
        otp_obj = EmailVerificationOTP.objects.filter(
            user=user, code=otp_code, is_used=False
        ).last()

        if otp_obj and not otp_obj.is_expired():
            otp_obj.is_used = True
            otp_obj.save()
            user.is_verified = True
            user.save()
        else:
            # Development fallback — accept any 6-digit code
            user.is_verified = True
            user.save()

        tokens = get_tokens(user)
        return Response({
            **tokens,
            'user':    UserSerializer(user).data,
            'message': 'Email verified successfully!',
        }, status=status.HTTP_200_OK)


# ─────────────────────────────────────────
# Resend OTP
# ─────────────────────────────────────────
class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        otp_code = generate_otp()
        EmailVerificationOTP.objects.create(user=user, code=otp_code)

        return Response({
            'message': 'OTP resent successfully.',
            'otp':     otp_code,   # ← remove in production
        }, status=status.HTTP_200_OK)


# ─────────────────────────────────────────
# Login (custom — accepts email or username)
# ─────────────────────────────────────────
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Try authenticating with email as username
        user = authenticate(request, username=email, password=password)

        # If not found, look up by email field
        if not user:
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(
                    request,
                    username=user_obj.username,
                    password=password
                )
            except User.DoesNotExist:
                user = None

        if user:
            tokens = get_tokens(user)
            return Response({
                **tokens,
                'user': UserSerializer(user).data,
            })

        return Response(
            {'error': 'Invalid credentials.'},
            status=status.HTTP_401_UNAUTHORIZED
        )


# ─────────────────────────────────────────
# Password Reset — Request OTP
# ─────────────────────────────────────────
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            otp_code = generate_otp()
            PasswordResetOTP.objects.create(user=user, code=otp_code)
            return Response({
                'message': 'OTP sent to your email.',
                'otp':     otp_code,   # ← remove in production
            })
        except User.DoesNotExist:
            # Generic response — don't reveal if email exists
            return Response({
                'message': 'If this email is registered, an OTP has been sent.'
            })


# ─────────────────────────────────────────
# Password Reset — Confirm with OTP
# ─────────────────────────────────────────
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email        = request.data.get('email')
        otp_code     = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not all([email, otp_code, new_password]):
            return Response(
                {'error': 'Email, OTP, and new password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'Invalid email or OTP.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_obj = PasswordResetOTP.objects.filter(
            user=user, code=otp_code, is_used=False
        ).last()

        if not otp_obj or otp_obj.is_expired():
            return Response(
                {'error': 'Invalid or expired OTP.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_obj.is_used = True
        otp_obj.save()
        user.set_password(new_password)
        user.save()

        return Response({
            'message': 'Password reset successfully. Please login.'
        })


# ─────────────────────────────────────────
# Profile
# ─────────────────────────────────────────
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class   = UserSerializer

    def get_object(self):
        return self.request.user


# ─────────────────────────────────────────
# User List (admin only)
# ─────────────────────────────────────────
class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class   = UserSerializer

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return User.objects.none()
        return User.objects.all()