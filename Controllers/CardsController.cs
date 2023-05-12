using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learn.Model;
using Learn.infrastructure;
using Learn.Stores;

namespace Learn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly learnContext _context;
        private readonly ILearnDateTime _learnDateTime;
        private readonly TestStore testStore;

        public CardsController(learnContext context, ILearnDateTime learnDateTime, TestStore testStore)
        {
            _context = context;
            _learnDateTime = learnDateTime;
            this.testStore = testStore;
        }

        // GET: api/Cards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards([FromQuery] int? subjectId=null, [FromQuery] bool test= false)
        {
            var Cards = await _context.Cards
                .Include(c => c.Details.OrderBy(d => d.Numbering))
                .ThenInclude(d => d.Type)
                .Where(c => subjectId == null || c.SubjectId == subjectId)
                .Where(c => !test  || c.NextShow == _learnDateTime.Now.Date )
                .ToListAsync();
            foreach (var item in Cards)
            {
                foreach (var i in item.Details)
                {
                    i.Card = null;
                    i.Type.Details = null;

                }
                foreach (var i in item.Tests)
                {
                    i.Card = null;
                }

            }
            return Cards;
        }

        // GET: api/Cards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCard(int id)
        {
            var card = await _context.Cards
                .Include(c => c.Details.OrderBy(d => d.Numbering))
                .ThenInclude(d => d.Type)
                .Where(c=>c.Id == id).FirstAsync();

            if (card == null)
            {
                return NotFound();
            }

            foreach (var i in card.Details)
            {
                i.Card = null;
                i.Type.Details = null;

            }
            foreach (var i in card.Tests)
            {
                i.Card = null;
            }

            return card;
        }

        // PUT: api/Cards/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(int id, Card card)
        {
            if (id != card.Id)
            {
                return BadRequest();
            }

            _context.Entry(card).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardExists(id))
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

        // PUT: api/Cards/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("Frequency/{id}")]
        public async Task<IActionResult> PutCardFrequency(int id, [FromBody]int frequency)
        {

            var card = _context.Cards.Where(c => c.Id == id);
            //TODO update card Frequency








            //card
            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!CardExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> PutCards(IEnumerable<Card> cards)
        {
            foreach (var card in cards)
            {
                _context.Entry(card).State = EntityState.Modified;

            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                foreach (var card in cards)
                {
                    if (!CardExists(card.Id))
                    {
                        return NotFound(card.Id);
                    }

                }
                throw;
            }

            return NoContent();
        }


        // POST: api/Cards
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Card>> PostCard(Card card)
        {
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            card = GetCard(card.Id).Result.Value;
            Test test = new Test() { CardId = card.Id };
            //TODO move create detalis logic here 
            //t1 test
            //t2 detail
            //await whenall
            await testStore.PostTest(test);

            
           
            card.Tests = null;
            return CreatedAtAction("GetCard", new { id = card.Id }, card);
        }

        // DELETE: api/Cards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Card>> DeleteCard(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return card;
        }

        private bool CardExists(int id)
        {
            return _context.Cards.Any(e => e.Id == id);
        }
    }
}
