# 🚀 Redis Cheat Sheet & Quickstart Guide

---

## 📦 Setup (Docker)

Run Redis Stack (includes RedisInsight + Redis modules):

```bash
docker run -d --name redis-stack \
  -p 6379:6379 -p 8001:8001 \
  redis/redis-stack:latest
```

## Connect to Redis CLI
```bash
docker exec -it redis-stack redis-cli
```

## 📚 Redis Data Types 
### 1️⃣ String
Basic key-value storage.
```js
await client.set("name", "Alice");
const name = await client.get("name");
```

### 2️⃣ Hash
Object-like storage.
```js
await client.hSet("user:100", {
  name: "Alice",
  age: "25",
  city: "NY"
});
const user = await client.hGetAll("user:100");
```

### 3️⃣ List (Linked List)
```js
await client.lPush("tasks", "task1");
await client.rPush("tasks", "task2");

const task = await client.lPop("tasks");
```

### 4️⃣ Set (Unique Values)
```js
await client.sAdd("tags", "node");
const tags = await client.sMembers("tags");
```
### 5️⃣ Sorted Set (ZSet)
```js
await client.zAdd("leaderboard", [
  { score: 100, value: "player1" },
  { score: 200, value: "player2" }
]);
```

### Pub/Sub (Real-time Messaging)
```js
await client.publish("news", "Hello!");

client.subscribe("news", (msg) => {
  console.log("Received:", msg);
});
```

## ⏳ TTL — Expiring Keys
Redis CLI
```bash
SET session:123 "user data" EX 60
```
Node.js
```js
await client.set("session:123", "user data", { EX: 60 });
```





# Redis 

### Setup
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
 
To connect cli: 
docker exec -it redis-stack redis-cli

### Data Types
String: 
await client.set("name", "Alice");
const name = await client.get("name");

Hash:
await client.hSet("user:100", {
    name: "Alice",  
    age: "25", 
    city: "NY"
});
const user = await client.hGetAll("user:100");

List (linked list - push/pop):
await client.lPush("tasks", "task1");
await client.rPush("tasks", "task2");
const task = await client.lPop("tasks");

4️⃣ Set (unique values):
await client.sAdd("tags", "node");
const tags = await client.sMembers("tags");

Sorted Set:
await client.zAdd("leaderboard", [
  { score: 100, value: "player1" },
  { score: 200, value: "player2" }
]);

7️⃣ Pub/Sub (real-time messaging)
await client.publish("news", "Hello!");
client.subscribe("news", msg => {
  console.log("Received:", msg);
});

### TTL
SET session:123 "user data" EX 60
await client.set("session:123", "user data", { EX: 60 });


