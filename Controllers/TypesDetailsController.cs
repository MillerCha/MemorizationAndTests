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
    public class TypesDetailsController : ControllerBase
    {
        private readonly learnContext _context;

        public TypesDetailsController(learnContext context)
        {
            _context = context;
        }

        // GET: api/TypesDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypesDetail>>> GetTypesDetails()
        {
            return await _context.TypesDetails.ToListAsync();
        }

        // GET: api/TypesDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypesDetail>> GetTypesDetail(int id)
        {
            var typesDetail = await _context.TypesDetails.FindAsync(id);

            if (typesDetail == null)
            {
                return NotFound();
            }

            return typesDetail;
        }

        // PUT: api/TypesDetails/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypesDetail(int id, TypesDetail typesDetail)
        {
            if (id != typesDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(typesDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypesDetailExists(id))
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

        // POST: api/TypesDetails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TypesDetail>> PostTypesDetail(TypesDetail typesDetail)
        {
            _context.TypesDetails.Add(typesDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypesDetail", new { id = typesDetail.Id }, typesDetail);
        }

        // DELETE: api/TypesDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TypesDetail>> DeleteTypesDetail(int id)
        {
            var typesDetail = await _context.TypesDetails.FindAsync(id);
            if (typesDetail == null)
            {
                return NotFound();
            }

            _context.TypesDetails.Remove(typesDetail);
            await _context.SaveChangesAsync();

            return typesDetail;
        }

        private bool TypesDetailExists(int id)
        {
            return _context.TypesDetails.Any(e => e.Id == id);
        }
    }
}
