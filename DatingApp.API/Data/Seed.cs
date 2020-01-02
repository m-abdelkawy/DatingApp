using DatingApp.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            this._context = context;
        }

        public void SeedUsers()
        {
            string userData = File.ReadAllText("Data/UserSeedData.json");

            // Deserialize json to .NET objects
            List<User> lstUser = JsonConvert.DeserializeObject<List<User>>(userData);

            for (int i = 0; i < lstUser.Count; i++)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                lstUser[i].PasswordHash = passwordHash;
                lstUser[i].PasswordSalt = passwordSalt;

                lstUser[i].UserName = lstUser[i].UserName.ToLower();

                
                _context.Add(lstUser[i]);
            }
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
