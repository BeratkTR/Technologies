const redis =  require("redis")

const client = redis.createClient({
    url: 'redis://localhost:6379' // Docker veya local adres
});

// Hata yakalama (Redis düşerse uygulaman çökmesin diye)
client.on('error', (err) => console.log('Redis Client Hatası:', err));

// Bağlantı başarılı olduğunda
client.on('connect', () => console.log('Redis\'e Bağlanıldı! 🚀'));

// Bağlantıyı başlat
(async () => {
    await client.connect();
})();

module.exports = client;