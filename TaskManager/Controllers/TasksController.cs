using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Dtos;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TasksController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetAllTasks()
        {
            var tasks = await _db.Tasks
                .AsNoTracking()
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                })
                .ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int id)
        {
            var task = await _db.Tasks
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);

            if(task is null)
            {
                return NotFound();
            }

            return Ok(new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt
            });

        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask([FromBody] TaskCreateDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title.Trim(),
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };
            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();

            var result = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
            };

            return CreatedAtAction(nameof(GetTaskById),
                new
                {
                id = task.Id
            }, result);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TaskDto>> UpdateIsCompleted(int id, [FromBody] TaskUpdateDto dto)
        {
            var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id);

            if (task is null)
                return NotFound(new
                {
                    message = $"Task with id {id} was not found"
                });

            task.IsCompleted = dto.IsCompleted;
            await _db.SaveChangesAsync();

            var result = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt
            };
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<TaskDto>> DeleteTask(int id)
        {
            var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task is null)
                return NotFound(new { message = $"Task with id {id} was not found." });

            _db.Tasks.Remove(task);
            _db.SaveChangesAsync();

            return NoContent();

        }

    }
}
