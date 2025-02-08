from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

class Blog(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='blog_images/')
    date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
################### Events Page #################

class Sponsor(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="sponsor_logos/")

    def __str__(self):
        return self.name

class InvitedGuest(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="guest_photos/")

    def __str__(self):
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    venue = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    sponsors = models.ManyToManyField(Sponsor, blank=True, related_name="events")
    invited_guests = models.ManyToManyField(InvitedGuest,  blank=True, related_name="events")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    
class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="event_images/")

    def __str__(self):
        return f"Image for {self.event.title}"
    
class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.PROTECT, null=True, related_name="registrations")
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.event.title}"
    
################### Events Page #################

############# Program and Project ###############

class Program(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    color = models.CharField(max_length=7, default="#FFFFFF")

    def __str__(self):
        return self.name
    
class ProjectName(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="project_names")
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=7, default="#FFFFFF")

    def __str__(self):
        return self.name


class Project(models.Model):
    program = models.ForeignKey(ProjectName, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=255)
    description = models.TextField()
    color = models.CharField(max_length=7, default="#FFFFFF")
    image = models.ImageField(upload_to="project_images/")
    video = models.FileField(upload_to="project_videos/", blank=True, null=True)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    total_budget = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Set the color to the Program's color if it's still the default value
        if self.color == "#FFFFFF":
            self.color = self.program.program.color  # Get the color from the associated Program
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ProjectItem(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="project_item_photos", blank=True, null=True)
    quantity_needed = models.PositiveIntegerField(blank=True, null=True)
    funds_needed = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} for {self.project.title}"

class Donor(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)  # blank name for anonymous donations
    is_anonymous = models.BooleanField(default=False)
    project_item = models.ForeignKey(ProjectItem, on_delete=models.CASCADE, related_name="donors")
    donation_type = models.CharField(max_length=10, choices=[("cash", "Cash"), ("inkind", "In-Kind")])
    amount_donated = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    quantity_donated = models.PositiveIntegerField(blank=True, null=True)
    donation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        donor_name = "Anonymous" if self.is_anonymous else self.name
        return f"{donor_name} donated to {self.project_item.name}"
    
############# Program and Project ###############

################ Profile Infos start ############################ 

class SheCan(models.Model):
    full_name = models.CharField(max_length=100)
    shecan_id = models.CharField(max_length=50, unique=True)
    cohert = models.PositiveIntegerField(default=1)
    profession = models.CharField(max_length=300, default="Undefined")
    self_description = models.TextField(blank=True, null=True)
    phone = PhoneNumberField(blank=True, null=True, help_text="+251912345678")
    address = models.CharField(max_length=255, blank=True, null=True)
    picture = models.ImageField(upload_to="shecan_images/")
    email = models.EmailField(max_length=254, blank=True, null=True)
    telegram = models.CharField(max_length=150, blank=True, null=True)
    instagram = models.CharField(max_length=150, blank=True, null=True)
    linkedin = models.CharField(max_length=150, blank=True, null=True)
    facebook = models.CharField(max_length=150, blank=True, null=True)
    skype = models.CharField(max_length=255, blank=True, null=True)

    skills = models.ManyToManyField("Skill", blank=True)
    languages = models.ManyToManyField("Language", blank=True)
    certificates = models.ManyToManyField("Certificate", blank=True)
    honors_and_awards = models.ManyToManyField("HonorAndAward", blank=True)
    interests = models.ManyToManyField("Interest", blank=True)
    work_experience = models.ManyToManyField("WorkExperience", blank=True)
    education = models.ManyToManyField("Education", blank=True)

    def __str__(self):
        return self.full_name
    
class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Language(models.Model):
    name = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=50, choices=[
        ('Native', 'Native'),
        ('Fluent', 'Fluent'),
        ('Intermediate', 'Intermediate'),
        ('Beginner', 'Beginner')
    ])

    def __str__(self):
        return f"{self.name} ({self.proficiency})"

class Certificate(models.Model):
    title = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    date_awarded = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.organization} ({self.date_awarded})"

class HonorAndAward(models.Model):
    title = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    date_awarded = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.organization} ({self.date_awarded})"

class Interest(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class WorkExperience(models.Model):
    job_title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.job_title} at {self.company} ({self.start_date} - {self.end_date or 'Present'})"

class Education(models.Model):
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    start_date = models.DateField()
    graduation_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.degree} at {self.institution} ({self.start_date} - {self.graduation_date or 'Present'})"

################ Profile infos end ############################ 

class SheCanStudent(models.Model):
    shecan_id = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    password_changed = models.BooleanField(default=False)

    # Method to set the password (hashing it before saving)
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    # Method to check the password (comparing the hashed password)
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    def __str__(self):
        return f"{self.shecan_id}"
    
class PhotoGallery(models.Model):
    photo = models.ImageField(upload_to="photo_gallery/")

### ------------ Shop Page ---------------- ###

class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="category_images/", blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    description = models.TextField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.category.name} - {self.description}"


class ProductSize(models.Model):
    product = models.ForeignKey(Product, related_name='sizes', on_delete=models.CASCADE)
    size = models.CharField(max_length=20, help_text="e.g., XS, S, M, L, XL or Small, Medium, Large ... ")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.description} - Size {self.size} ({self.price} ETB)"


class ProductPhoto(models.Model):
    product = models.ForeignKey(Product, related_name="photos", on_delete=models.CASCADE) 
    image = models.ImageField(upload_to="product_photos/")

    def __str__(self):
        return f"Photo: {self.image.url}"

### --------------- Volunteer Form ---------------- ###

class Volunteer(models.Model):
    first_name = models.CharField(max_length=50)
    fathers_name = models.CharField(max_length=50)
    grandfathers_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    NATIONALITY_CHOICES = [
        ('Ethiopian', 'Ethiopian'),
        ('Ethiopian Diaspora', 'Ethiopian Diaspora'),
        ('Other', 'Other'),
    ]
    nationality = models.CharField(max_length=20, choices=NATIONALITY_CHOICES)
    MARITAL_STATUS_CHOICES = [
        ('Single', 'Single'),
        ('Married', 'Married'),
        ('Other', 'Other'),
    ]
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    EMPLOYMENT_STATUS_CHOICES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Not Employed', 'Not Employed'),
        ('Self Employed', 'Self Employed'),
        ('Homemaker', 'Homemaker'),
        ('Retired', 'Retired'),
        ('Student', 'Student'),
        ('Other', 'Other'),
    ]
    employment_status = models.CharField(max_length=20, choices=EMPLOYMENT_STATUS_CHOICES)
    EDUCATION_CHOICES = [
        ('Less than High School Diploma', 'Less than High School Diploma'),
        ('High School Diploma', 'High School Diploma'),
        ('College / University Student', 'College / University Student'),
        ('Bachelors Degree', 'Bachelors Degree'),
        ('Msc', 'Msc'),
        ('PHD', 'PHD'),
    ]
    education = models.CharField(max_length=50, choices=EDUCATION_CHOICES)

    address = models.CharField(max_length=100)
    phone_number = PhoneNumberField()
    second_phone_number = PhoneNumberField(blank=True, null=True)
    email_address = models.EmailField(blank=True, null=True)
    telegram_username = models.CharField(max_length=50, blank=True, null=True)

    field_of_work = models.CharField(max_length=100)
    WORK_EXPERIENCE_CHOICES = [
        ('0-1', '0-1'),
        ('2-5', '2-5'),
        ('5-8', '5-8'),
        ('Above 9 years', 'Above 9 years'),
    ]
    work_experience = models.CharField(max_length=20, choices=WORK_EXPERIENCE_CHOICES)
    AVAILABLE_HOURS_CHOICES = [
        ('0-5 hours', '0-5 hours'),
        ('5-10 hours', '5-10 hours'),
        ('11-20 hours', '11-20 hours'),
        ('21-30 hours', '21-30 hours'),
        ('31-40 hours', '31-40 hours'),
        ('More than 40 hours', 'More than 40 hours'),
    ]
    available_hours = models.CharField(max_length=20, choices=AVAILABLE_HOURS_CHOICES)
    INTERESTS_CHOICES = [
        ('Architecture', 'Architecture'),
        ('Art', 'Art'),
        ('Crafting and DIY', 'Crafting and DIY'),
        ('Design', 'Design'),
        ('Education', 'Education'),
        ('Engineering', 'Engineering'),
        ('Finance', 'Finance'),
        ('Interior Design', 'Interior Design'),
        ('Gaming', 'Gaming'),
        ('Leadership', 'Leadership'),
        ('Literature', 'Literature'),
        ('Music', 'Music'),
        ('Photography', 'Photography'),
        ('Science', 'Science'),
        ('Sport', 'Sport'),
        ('Technology', 'Technology'),
        ('Woman Empowerment', 'Woman Empowerment'),
        ('Youth Empowerment', 'Youth Empowerment'),
    ]
    interests = models.CharField(max_length=50, choices=INTERESTS_CHOICES)
    TEAM_CHOICES = [
        ('Creative and Art', 'Team Creative and Art'),
        ('Engineering', 'Team Engineering'),
        ('Event & Fund Raising', 'Team Event & Fund Raising'),
        ('Research and Development', 'Team Research and Development'),
        ('Technology', 'Team Technology'),
        ('Training & Consult', 'Team Training & Consult'),
        ('Legal', 'Team Legal'),
    ]
    preferred_team = models.CharField(max_length=50, choices=TEAM_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.fathers_name}"
    
### --------------- Volunteer Form End ---------------- ###

### --------------- Partners ---------------- ###

class Partner(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="sponsor_logos")

    def __str__(self):
        return self.name
    
### --------------- Partners End ---------------- ###

### --------------- Board Member ---------------- ###

class BoardMember(models.Model):
    full_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='board_members/', blank=True, null=True)
    description = models.TextField()
    email = models.EmailField()
    facebook = models.CharField(max_length=255, blank=True, null=True)
    linkedin = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.full_name
    
### --------------- Board Member End ---------------- ###