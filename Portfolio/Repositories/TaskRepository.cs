using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _db;

        public TaskRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<TaskItem>> GetAllTaskAsync()
        {
            return await _db.Tasks
                .AsNoTracking()
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _db.Tasks
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AddTaskAsync(TaskItem task)
        {
            await _db.Tasks.AddAsync(task);
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }

        public void DeleteTaskAsync(TaskItem task)
        {
            _db.Tasks.Remove(task);
        }
    }
}
