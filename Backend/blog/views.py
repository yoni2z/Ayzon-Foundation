import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth.hashers import check_password, make_password

from .models import (
    Blog,
    Event, EventRegistration, Sponsor, InvitedGuest,
    Program, ProjectName, Project,
    SheCan, Skill, Language, Certificate, HonorAndAward, Interest, WorkExperience, Education,
    SheCanStudent,
    PhotoGallery,
    Category, Product, ProductPhoto, ProductSize,
    Volunteer,
    Partner,
    BoardMember
    )
from .serializers import (
    BlogSerializer,
    EventSerializer, EventRegistrationSerializer, SponsorSerializer, InvitedGuestSerializer,
    ProgramSerializer, ProjectNameSerializer, ProjectSerializer,
    SheCanSerializer,
    PhotoGallerySerializer,
    CategorySerialzer, ProductSerialzer, ProductPhotoSerializer, ProductSizeSerialzer,
    VolunteerSerializer,
    PartnerSerializer,
    BoardMemberSerializer
    )
from rest_framework import generics, viewsets

class BlogListAPIView(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer

class SponsorViewSet(viewsets.ModelViewSet):
    queryset = Sponsor.objects.all()
    serializer_class = SponsorSerializer

class InvitedGuestViewSet(viewsets.ModelViewSet):
    queryset = InvitedGuest.objects.all()
    serializer_class = InvitedGuestSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventRegistrationView(generics.CreateAPIView):
    serializer_class = EventRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration Successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def event_details_with_registrations(request, event_id):
    event = Event.objects.get(id=event_id)
    registered_users = EventRegistration.objects.filter(event=event)
    
    event_data = EventSerializer(event).data
    event_data["registered_users"] = [
        {"name": user.name, "email": user.email} for user in registered_users
    ]
    
    return Response(event_data)

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = ProjectName.objects.all()
    serializer_class = ProjectNameSerializer

class ProjectDetailViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class SheCanAPIView(viewsets.ModelViewSet):
    queryset = SheCan.objects.all()
    serializer_class = SheCanSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name', None)
        cohort = self.request.query_params.get('cohort', None)

        if name:
            queryset = queryset.filter(full_name__icontains=name)

        if cohort:
            queryset = queryset.filter(cohort=cohort)
        return queryset

@api_view(['POST'])
def submit_resume(request):
    data = request.POST.get('data', '{}')
    data = json.loads(data)

    # Handle file upload
    graduate_picture = request.FILES.get('graduatePicture', None)
    
    try:
        # Create or update SheCan instance
        shecan_instance, created = SheCan.objects.update_or_create(
            shecan_id=data.get('shecan_id', None),  # Use unique shecan_id
            defaults={
                'full_name': data['graduateName'],
                'shecan_id': data['graduateId'],
                'picture': graduate_picture,
                'profession': data.get('graduateProfession', "Undefined"),
                'self_description': data.get('selfDescription', ""),
                'phone': data['contactLinks'].get('mobilePhoneNo', None),
                'address': data['contactLinks'].get('location', None),
                'email': data['contactLinks'].get('email', None),
                'telegram': data['contactLinks'].get('telegram', None),
                'instagram': data['contactLinks'].get('instagram', None),
                'linkedin': data['contactLinks'].get('linkedin', None),
                'facebook': data['contactLinks'].get('facebook', None),
                'skype': data['contactLinks'].get('skype', None),
            }
        )

        # Update or create related Many-to-Many fields
        if 'skills' in data:
            skill_objects = [Skill.objects.get_or_create(name=skill)[0] for skill in data['skills']]
            shecan_instance.skills.set(skill_objects)

        if 'languages' in data:
            language_objects = [Language.objects.get_or_create(
                name=lang['language'],
                defaults={'proficiency': lang.get('proficiency', 'Beginner')}
            )[0] for lang in data['languages']]
            shecan_instance.languages.set(language_objects)

        if 'certificates' in data:
            certificate_objects = [
                Certificate.objects.get_or_create(
                    title=cert['certificateName'],
                    defaults={'organization': cert.get('certifier', ""), 'date_awarded': cert.get('dateAwarded', None)}
                )[0] for cert in data['certificates']
            ]
            shecan_instance.certificates.set(certificate_objects)

        if 'awards' in data:
            award_objects = [
                HonorAndAward.objects.get_or_create(
                    title=award['awardName'],
                    defaults={'organization': award.get('certifier', ""), 'date_awarded': award.get('dateAwarded', None)}
                )[0] for award in data['awards']
            ]
            shecan_instance.honors_and_awards.set(award_objects)

        if 'interests' in data:
            interest_objects = [Interest.objects.get_or_create(name=interest)[0] for interest in data['interests']]
            shecan_instance.interests.set(interest_objects)

        if 'workExperience' in data:
            work_objects = []
            for work in data['workExperience']:
                descriptions = work.get('exprienceDescriptions', [])
                concatenated_description = "\n\n".join(descriptions)

                # Create or get WorkExperience object
                work_obj, _ = WorkExperience.objects.get_or_create(
                    job_title=work['profession'],
                    company=work['companyName'],
                    defaults={
                        'start_date': work.get('startDate', None),
                        'end_date': work.get('terminationDate', None),
                        'location': work.get('locationOfCompany', None),
                        'description': concatenated_description  # Save the concatenated description
                    }
                )
                work_objects.append(work_obj)

            shecan_instance.work_experience.set(work_objects)


        if 'education' in data:
            education_objects = [
                Education.objects.get_or_create(
                    degree=edu['field_of_study'],
                    institution=edu['university'],
                    defaults={
                        'start_date': edu.get('startDate', None),
                        'graduation_date': edu.get('graduationDate', None),
                        'location': edu.get('location', None)
                    }
                )[0] for edu in data['education']
            ]
            shecan_instance.education.set(education_objects)

        # Save the instance after all updates
        shecan_instance.save()

        return Response({'id': shecan_instance.id, 'message': 'Resume submitted successfully.'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
# Login View: Authenticate the user based on SheCan ID and password
@api_view(['POST'])
def login(request):
    shecan_id = request.data.get('shecan_id')
    password = request.data.get('password')

    try:
        student = SheCanStudent.objects.get(shecan_id=shecan_id)
        if check_password(password, student.password):
            if not student.password_changed:
                # Redirect to password change page if password has not been changed
                return JsonResponse({"redirect": "/change_password", "message": "Password needs to be updated!"}, status=200)
            return JsonResponse({"redirect": "/shecan_form", "message": "Login successful!"}, status=200)
        else:
            return JsonResponse({"message": "Invalid password!"}, status=400)
    except SheCanStudent.DoesNotExist:
        return JsonResponse({"message": "SheCan ID not found!"}, status=400)

# Change Password View: Update the password for a student
@api_view(['POST'])
def change_password(request):
    shecan_id = request.data.get('shecan_id')
    new_password = request.data.get('new_password')

    try:
        student = SheCanStudent.objects.get(shecan_id=shecan_id)
        student.set_password(new_password)  # Hash the new password before saving
        student.password_changed = True
        student.save()
        return JsonResponse({"message": "Password updated successfully!"}, status=200)
    except SheCanStudent.DoesNotExist:
        return JsonResponse({"message": "SheCan ID not found!"}, status=400)

class PhotoGalleryViewSet(viewsets.ModelViewSet):
    queryset = PhotoGallery.objects.all()
    serializer_class = PhotoGallerySerializer

### -------- shop -------------- ###

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerialzer

### --------- Volunteer Form ---------- ###

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

class VolunteerChoicesAPIView(APIView):
    def get(self, request):
        choices = {
            "gender_choices": Volunteer.GENDER_CHOICES,
            "nationality_choices": Volunteer.NATIONALITY_CHOICES,
            "marital_status_choices": Volunteer.MARITAL_STATUS_CHOICES,
            "employment_status_choices": Volunteer.EMPLOYMENT_STATUS_CHOICES,
            "education_choices": Volunteer.EDUCATION_CHOICES,
            "work_experience_choices": Volunteer.WORK_EXPERIENCE_CHOICES,
            "available_hours_choices": Volunteer.AVAILABLE_HOURS_CHOICES,
            "interests_choices": Volunteer.INTERESTS_CHOICES,
            "team_choices": Volunteer.TEAM_CHOICES,
        }
        return Response(choices)
    
class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class BoardMemberViewSet(viewsets.ModelViewSet):
    queryset = BoardMember.objects.all()
    serializer_class = BoardMemberSerializer