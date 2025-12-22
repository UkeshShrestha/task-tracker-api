using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Dtos;
using TaskManager.Models;
using TaskManager.Services;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetAllTasks()
        {
            return Ok(await _service.GetAllTasksAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int id)
        {
            var task = await _service.GetTaskByIdAsync(id);
            if (task is null)
                return NotFound(new { message = $"Task with id {id} was not found." });
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask([FromBody] TaskCreateDto dto)
        {
            var created = await _service.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetTaskById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TaskDto>> UpdateTask(int id, [FromBody] TaskUpdateDto dto)
        {
            var updated = await _service.UpdateTaskAsync(id, dto.IsCompleted);
            if (updated is null)
                return NotFound(new { message = $"Task with id {id} was not found." });
            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var success = await _service.DeleteTaskAsync(id);
            if (!success)
                return NotFound(new { message = $"Task with id {id} was not found." });
            return NoContent();
        }

    }
}
