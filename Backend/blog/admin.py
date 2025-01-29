from django.contrib import admin

from .models import (
    Blog,
    Sponsor, 
    InvitedGuest, 
    Event, EventImage, 
    EventRegistration,
    Program, ProjectName, Project, ProjectItem, Donor,
    SheCan, Skill, Language, Certificate, HonorAndAward, Interest, WorkExperience, Education, 
    SheCanStudent,
    PhotoGallery,
    Category, Product, ProductPhoto, ProductSize,
    Volunteer,
)
# Register your models here.

admin.site.register(Blog)
admin.site.register(Sponsor)
admin.site.register(InvitedGuest)
class EventImageInline(admin.TabularInline):  # You can also use StackedInline
    model = EventImage
    extra = 1  

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    inlines = [EventImageInline]
admin.site.register(EventRegistration)
admin.site.register(Program)
admin.site.register(ProjectName)
admin.site.register(Project)
admin.site.register(ProjectItem)
admin.site.register(Donor)
admin.site.register(SheCan)
admin.site.register(Skill)
admin.site.register(Language)
admin.site.register(Certificate)
admin.site.register(HonorAndAward)
admin.site.register(Interest)
admin.site.register(WorkExperience)
admin.site.register(Education)
admin.site.register(PhotoGallery)
admin.site.register(Volunteer)

admin.site.register(Category)
# admin.site.register(Product)
admin.site.register(ProductSize)
admin.site.register(ProductPhoto)

class SheCanStudentAdmin(admin.ModelAdmin):
    list_display = ('shecan_id', 'password') 

    def save_model(self, request, obj, form, change):
        if obj.password: 
            obj.set_password(obj.password) 
        super().save_model(request, obj, form, change)

admin.site.register(SheCanStudent, SheCanStudentAdmin)

### --------- shop page --------------- ### 

class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1 
    fields = ['size', 'price']

class ProductPhotoInline(admin.TabularInline):
    model = ProductPhoto
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['description', 'category', 'base_price', 'total'] 
    inlines = [ProductSizeInline, ProductPhotoInline]


