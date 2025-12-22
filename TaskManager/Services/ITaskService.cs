using TaskManager.Dtos;

namespace TaskManager.Services
{
    public interface ITaskService
    {
        Task<List<TaskDto>> GetAllTasksAsync();
        Task<TaskDto?> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTaskAsync(TaskCreateDto createTaskDto);
        Task<TaskDto> UpdateTaskAsync(int id, bool isCompleted);
        Task<bool> DeleteTaskAsync(int id);
    }
}
