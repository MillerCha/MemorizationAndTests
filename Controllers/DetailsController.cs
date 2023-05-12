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
    public class DetailsController : ControllerBase
    {
        private readonly learnContext _context;

        public DetailsController(learnContext context)
        {
            _context = context;
        }

        // GET: api/Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detail>>> GetDetails()
        {
            return await _context.Details.ToListAsync();
        }

        // GET: api/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Detail>> GetDetail(int id)
        {
            var detail = await _context.Details.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            return detail;
        }

        // PUT: api/Details/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetail(int id, Detail detail)
        {
            if (id != detail.Id)
            {
                return BadRequest();
            }

            _context.Entry(detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailExists(id))
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

        [HttpPut]
        public async Task<IActionResult> PutDetails(IEnumerable<Detail> details)
        {
            
                foreach (var detail in details)
                {
                    //detail.Type = null;
                    _context.Entry(detail).State = EntityState.Modified;

                }

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    foreach (var detail in details)
                    {
                        if (!DetailExists(detail.Id))
                        {
                            return NotFound(detail.Id);
                        }

                    }
                    throw;
                }
            
            return NoContent();
        }
        // POST: api/Details
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Detail>> PostDetail(Detail detail)
        {
            detail.Type = null;
            _context.Details.Add(detail);
            await _context.SaveChangesAsync();
            ////TODO status 500
            return CreatedAtAction("GetDetail", new { id = detail.Id }, detail);
        }

        // DELETE: api/Details/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Detail>> DeleteDetail(int id)
        {
            var detail = await _context.Details.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            _context.Details.Remove(detail);
            await _context.SaveChangesAsync();

            return detail;
        }

        private bool DetailExists(int id)
        {
            return _context.Details.Any(e => e.Id == id);
        }
    }
}
