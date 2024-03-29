using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public BasketDto Basket { get; set; }
        public string Role { get; set; }
        public string UserName { get; set; }
    }
}