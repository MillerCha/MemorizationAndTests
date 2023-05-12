using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learn.Model;

namespace Learn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly learnContext _context;

        public SubjectsController(learnContext context)
        {
            _context = context;
        }

        // GET: api/Subjects
        [HttpGet]
        //<IEnumerable<Subject>>
        public async Task<ActionResult> GetSubjects([FromQuery]int? parent = null)
        {
            var subjectsList = await _context.Subjects
                //.Include(s => s.Cards) 
                //.Include(s => s.InverseParentSubject) 
                .Where(s=> parent == null || s.ParentSubjectId == parent)
                //.Select(s => new {
                //    s.Id,
                //    s.Title,
                //    s.Cards,
                //    SubjectChildren = s.InverseParentSubject.Select(i => new { i.Id, i.Title}),
                //    s.ParentSubjectId,
                //    s.ShowFrequency
                //})
                .ToListAsync();
            foreach (var item in subjectsList)
            {
                item.InverseParentSubject = null;
                //foreach (var i in item.InverseParentSubject)
                //{
                //    i.ParentSubject = null;
                //} 

            }
            return Ok(subjectsList);
        }

        // GET: api/Subjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetSubject(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }

        // PUT: api/Subjects/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubject(int id, Subject subject)
        {
            if (id != subject.Id)
            {
                return BadRequest();
            }

            _context.Entry(subject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Subjects
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Subject>> PostSubject(Subject subject)
        {
            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubject", new { id = subject.Id }, subject);
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Subject>> DeleteSubject(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();

            return subject;
        }

        private bool SubjectExists(int id)
        {
            return _context.Subjects.Any(e => e.Id == id);
        }
    }
}
