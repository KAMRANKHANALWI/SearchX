<div align="center">  

# 🔍 SearchX

***A Mini Perplexity Clone*** – *Crawl the Web in Seconds*

<br/>  

<div>  
  <img src="https://github.com/user-attachments/assets/c19b4ace-68b4-4764-aad2-3045f5d5e2b5" alt="SearchX" style="border-radius: 20px; box-shadow: 0 4px 25px rgba(0,0,0,0.3);" />  
</div>  

<br/>  

SearchX is a **modern AI-powered web search application** that combines intelligent agents with **real-time web crawling**. It delivers **fast, accurate, and conversational answers** by orchestrating LLM reasoning with live web data.

</div>  

---

## 📌 Features

* 🤖 **AI-Powered Search** – Google Gemini 2.0 Flash for smart query analysis
* ⚡ **Real-time Streaming** – Instant answers via Server-Sent Events (SSE)
* 🔍 **Web Crawling** – Tavily Search API integration for up-to-date results
* 💬 **Chat Interface** – Conversational search with history support
* 🎨 **Modern UI** – Built with Tailwind CSS and smooth animations (GSAP + Motion)
* 🔐 **Authentication** – Secure login via NextAuth.js
* 📱 **Responsive Design** – Optimized for all screen sizes

---

## 🛠 Tech Stack

### **Backend**

* [FastAPI](https://fastapi.tiangolo.com/) – High-performance Python web framework
* [LangGraph](https://www.langchain.com/langgraph) – AI agent orchestration
* [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) – LLM reasoning
* [Tavily Search](https://tavily.com/) – Real-time search API
* [Pydantic](https://docs.pydantic.dev/) – Data validation
* [Uvicorn](https://www.uvicorn.org/) – ASGI server
* Server-Sent Events – Streaming API responses

### **Frontend**

* [Next.js 15](https://nextjs.org/) – React framework with App Router
* [React 19](https://react.dev/) – Concurrent React features
* [TypeScript](https://www.typescriptlang.org/) – Type-safe development
* [Tailwind CSS 4](https://tailwindcss.com/) – Utility-first styling
* [NextAuth.js](https://next-auth.js.org/) – Authentication
* [GSAP](https://greensock.com/gsap/) + [Motion](https://motion.dev/) – UI animations

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KAMRANKHANALWI/SearchX.git
cd SearchX
```

### 2️⃣ Setup Environment Variables

Create `.env` files inside both `backend/` and `frontend/`.

**Backend (.env):**

```env
GOOGLE_API_KEY=your_google_gemini_api_key
TAVILY_API_KEY=your_tavily_search_api_key
```

**Frontend (.env):**

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=your_nextauth_secret
AUTH_URL=http://localhost:3000
```

### 3️⃣ Install Dependencies

**Backend:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend:**

```bash
cd frontend
npm install
```

### 4️⃣ Run the Application

**Backend (FastAPI + Uvicorn):**

```bash
cd backend
uvicorn src.app:app --reload
```

**Frontend (Next.js):**

```bash
cd frontend
npm run dev
```

### 5️⃣ Access the App

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend API → [http://localhost:8000](http://localhost:8000)

---

## 📸 How It Works

<div align="center">
  <img src="https://github.com/user-attachments/assets/7bf2caf6-b04b-492c-a84c-fe9dbd1acae2" alt="SearchX Agent Flow" width="350" height="350" />
</div>  


1. **User Input** → Enter query in chat interface
2. **AI Processing** → Google Gemini 2.0 Flash interprets query
3. **Web Search** → Tavily API fetches real-time results
4. **Response Generation** → Synthesized, accurate answer created
5. **Streaming Output** → Answer streamed to frontend in real-time

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

---

## 📜 License

MIT License © 2025 

