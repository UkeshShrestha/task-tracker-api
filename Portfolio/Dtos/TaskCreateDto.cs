using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
    public class TaskCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
    }
}
