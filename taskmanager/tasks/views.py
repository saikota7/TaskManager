from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

@api_view(['PATCH'])
def toggle_task_completion(request, pk):
    try:
        task = Task.objects.get(pk=pk)
        task.completed = not task.completed  # Toggle the completion status
        task.save()
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)
