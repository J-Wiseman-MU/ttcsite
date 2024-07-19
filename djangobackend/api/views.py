from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login
from .models import User, Game
from .serializers import UserSerializer, GameSerializer
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import logging

class UserCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({'out': False, 'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
                                            
        try:
            user = User.objects.create_user(username=username, password=password)
            return Response({'out': True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'out': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

logger = logging.getLogger(__name__)

class UserLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        #user = authenticate(request, username=username, password=password)
        print(f"Attempting to authenticate user: {username}\n")
        # Get the authentication backends
        from django.contrib.auth import get_backends
        backends = get_backends()
        
        for backend in backends:
            try:
                user = backend.authenticate(request, username=username, password=password)
                
                                                    
                                                                                                                                                                                                                                                                                                                                            
                if user:
                    login(request, user)
                    response = Response({'out': True,})
                    if not request.session.session_key:
                        request.session.create()
                    print(f"Session key: {request.session.session_key}")
                    #if settings.SESSION_COOKIE_NAME not in request.COOKIES:
                    response.set_cookie(
                            settings.SESSION_COOKIE_NAME,
                            request.session.session_key,
                            max_age=settings.SESSION_COOKIE_AGE,
                            domain=settings.SESSION_COOKIE_DOMAIN,
                            secure=settings.SESSION_COOKIE_SECURE,
                            httponly=settings.SESSION_COOKIE_HTTPONLY,
                            samesite=settings.SESSION_COOKIE_SAMESITE
                    )
                    print(f"Cookies in response: {response.cookies}") 
                    return response
            except Exception as e:
                print(f"Error during authentication with backend {backend}: {str(e)}")
        return Response({'out': False}, status=status.HTTP_401_UNAUTHORIZED)

class GameListView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        print(f"User: {request.user}")
        print(f"Authenticated: {request.user.is_authenticated}")
        print(f"Session: {request.session.items()}")
        print(f"CSRF Token: {request.META.get('CSRF_COOKIE')}")
        print(f"Headers: {request.headers}")
        name = request.data.get('name')
        games = Game.objects.filter(user__username=name)
        serializer = GameSerializer(games, many=True)
        return Response({'result': serializer.data})

@method_decorator(csrf_exempt, name='dispatch')
class GameSaveView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

