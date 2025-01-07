from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet, toggle_task_completion

router = DefaultRouter()
router.register('tasks', TaskViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/tasks/<int:pk>/toggle-completed/', toggle_task_completion, name='toggle-task-completion'),
]
