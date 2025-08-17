using System;
using System.Collections.Generic;

namespace Core.Models
{
    public class Question
    {
        public string Text { get; set; }
        public List<string> Options { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
