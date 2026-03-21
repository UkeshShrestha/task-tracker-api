using TaskManager.Dtos;
using TaskManager.Repositories;

namespace TaskManager.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repo;

        public TaskService(ITaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<TaskDto> CreateTaskAsync(TaskCreateDto createTaskDto)
        {
            var taskItem = new Models.TaskItem
            {
                Title = createTaskDto.Title,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            await _repo.AddTaskAsync(taskItem);
            await _repo.SaveChangesAsync();

            return new TaskDto
            {
                Id = taskItem.Id,
                Title = taskItem.Title,
                IsCompleted = taskItem.IsCompleted,
                CreatedAt = taskItem.CreatedAt
            };
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var taskItem = await _repo.GetTaskByIdAsync(id);
            if (taskItem is null)
            {
                return false;
            }
            _repo.DeleteTaskAsync(taskItem);
            await _repo.SaveChangesAsync();
            return true;
        }

        public async Task<List<TaskDto>> GetAllTasksAsync()
        {
            var taskItems = await _repo.GetAllTaskAsync();
            return taskItems.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt
            }).ToList();

        }

        public async Task<TaskDto?> GetTaskByIdAsync(int id)
        {
            var taskItem = await _repo.GetTaskByIdAsync(id);
            if (taskItem is null)
            {
                return null;
            }
            return new TaskDto
            {
                Id = taskItem.Id,
                Title = taskItem.Title,
                IsCompleted = taskItem.IsCompleted,
                CreatedAt = taskItem.CreatedAt
            };
        }

        public async Task<TaskDto> UpdateTaskAsync(int id, bool isCompleted)
        {
            var TaskItem = await _repo.GetTaskByIdAsync(id);
            if (TaskItem is null)
            {
                return null;
            }
            TaskItem.IsCompleted = isCompleted;
            await _repo.SaveChangesAsync();
            return new TaskDto
            {
                Id = TaskItem.Id,
                Title = TaskItem.Title,
                IsCompleted = TaskItem.IsCompleted,
                CreatedAt = TaskItem.CreatedAt
            };
        }
    }
}
