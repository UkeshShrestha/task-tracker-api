using TaskManager.Models;

namespace TaskManager.Repositories
{
    public interface ITaskRepository
    {
        Task<List<TaskItem>> GetAllTaskAsync();
        Task<TaskItem?> GetTaskByIdAsync(int id);
        Task AddTaskAsync(TaskItem task);
        Task SaveChangesAsync();
        void DeleteTaskAsync(TaskItem task);
    }
}
