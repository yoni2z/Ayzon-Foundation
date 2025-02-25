from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    BlogListAPIView,
    EventViewSet,
    EventRegistrationView, SponsorViewSet, InvitedGuestViewSet,
    event_details_with_registrations,
     ProgramViewSet,
    ProjectViewSet,
    ProjectDetailViewSet,
    SheCanAPIView,
    submit_resume,
    login, change_password,
    PhotoGalleryViewSet,
    CategoryViewSet, ProductViewSet,
    VolunteerViewSet, VolunteerChoicesAPIView,
    PartnerViewSet,
    BoardMemberViewSet
)

router = DefaultRouter()
router.register(r'photo-gallery', PhotoGalleryViewSet, basename='photo-gallery')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'sponsors', SponsorViewSet, basename='sponsors')
router.register(r'invited-guests', InvitedGuestViewSet, basename='invited-guests')
router.register(r'volunteers', VolunteerViewSet, basename='volunteers')
router.register(r'partners', PartnerViewSet, basename="partners")
router.register(r'board-members', BoardMemberViewSet, basename="board-members")


urlpatterns = [
    path('api/blogs/', BlogListAPIView.as_view({'get': 'list'}), name='blog-list'),
    path('api/blogs/<int:pk>/', BlogListAPIView.as_view({'get': 'retrieve'}), name='blog-details'),
    path('api/events/', EventViewSet.as_view({'get': 'list'}), name='event-list'),
    path('api/events/<int:pk>/', EventViewSet.as_view({'get': 'retrieve'}), name='event-detail'),
    path('api/events/register/', EventRegistrationView.as_view(), name='event-registration'),
    path('api/events/registered/<int:event_id>/', event_details_with_registrations, name='event-details-with-registrations'),
    path('api/shecan/', SheCanAPIView.as_view({'get': 'list'}), name = "she-can"),
    path('api/shecan/<int:pk>/', SheCanAPIView.as_view({'get': 'retrieve'}), name = "she-can-details"),
    path('api/shecan_form/', submit_resume, name='submit-resume'), #
    path('api/programs/', ProgramViewSet.as_view({'get': 'list'}), name='program-list'),
    path('api/programs/<int:pk>/', ProgramViewSet.as_view({'get': 'retrieve'}), name='program-details'),
    path('api/projects/', ProjectViewSet.as_view({'get': 'list'}), name='projects-list'),
    path('api/projects/<int:pk>/', ProjectViewSet.as_view({'get': 'retrieve'}), name='projects-details'),
    path('api/project-details/', ProjectDetailViewSet.as_view({'get': 'list'}), name='project-list'),
    path('api/project-details/<int:pk>/', ProjectDetailViewSet.as_view({'get': 'retrieve'}), name='project-details'),
    path('login/', login, name='login'),
    path('change_password/', change_password, name='change-password'),
    path('api/user-choices/', VolunteerChoicesAPIView.as_view(), name='user-choices'),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)