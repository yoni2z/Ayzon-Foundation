from rest_framework import serializers
from django.conf import settings
from .models import (
    Blog,
    Sponsor, InvitedGuest, EventImage, Event, EventRegistration,
    Program, ProjectName, Project, ProjectItem,
    Skill, Language, Certificate, HonorAndAward, Interest, WorkExperience, Education, SheCan,
    PhotoGallery,
    Category, Product, ProductPhoto, ProductSize,
    Volunteer,
    )

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'description', 'image', 'created_at']

class SponsorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = ['id', 'name', 'logo']

class InvitedGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitedGuest
        fields = ['id', 'name', 'photo']

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['image']

class EventSerializer(serializers.ModelSerializer):
    sponsors = SponsorSerializer(many=True)
    invited_guests = InvitedGuestSerializer(many = True)
    images = EventImageSerializer(many=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'venue', 'date', 'time',
            'sponsors', 'invited_guests', 'images'
        ]

class EventRegistrationSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.filter(is_active=True))

    class Meta:
        model = EventRegistration
        fields = ['id', 'event', 'name', 'email']

class ProjectItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectItem
        fields = ['id', 'name', 'photo', 'quantity_needed', 'funds_needed']

class ProjectSerializer(serializers.ModelSerializer):
    items = ProjectItemSerializer(many=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'color', 'image', 'video', 'latitude', 'longitude', 'total_budget', 'items']

class ProjectNameSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)
    
    class Meta:
        model = ProjectName
        fields = ['id', 'name', 'color', 'projects']

class ProgramSerializer(serializers.ModelSerializer):
    project_names = ProjectNameSerializer(many=True)

    class Meta:
        model = Program
        fields = ['id', 'name', 'color', 'description', 'project_names']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class HonorAndAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = HonorAndAward
        fields = '__all__'

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class SheCanSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    languages = LanguageSerializer(many=True)
    certificates = CertificateSerializer(many=True)
    honors_and_awards = HonorAndAwardSerializer(many=True)
    interests = InterestSerializer(many=True)
    work_experience = WorkExperienceSerializer(many=True)
    education = EducationSerializer(many=True)

    class Meta:
        model = SheCan
        fields = ['id', 'full_name', 'shecan_id', 'cohert', 'profession', 'self_description', 'phone', 'address', 'picture', 'email', 'telegram', 'instagram',
                  'linkedin', 'facebook', 'skype', 'skills', 'languages', 'certificates', 'honors_and_awards', 'interests', 'work_experience', 'education']

class PhotoGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoGallery
        fields = ['photo']

### --------- shop ----------------  ###

class ProductPhotoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ProductPhoto
        fields = ['id', 'image']

class ProductSizeSerialzer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['id', 'size', 'price']

class ProductSerialzer(serializers.ModelSerializer):
    sizes = ProductSizeSerialzer(many=True)
    photos = ProductPhotoSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'description', 'image', 'base_price', 'total', 'sizes', 'photos']

class CategorySerialzer(serializers.ModelSerializer):
    products = ProductSerialzer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'products']

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'