using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
    public class TaskUpdateDto
    {
        [Required]
        public bool IsCompleted { get; set; }
    }
}
