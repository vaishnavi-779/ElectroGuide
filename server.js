require("dotenv").config();
const express=require("express");
const OpenAI=require("openai");

const app=express();
app.use(express.json({limit:"64kb"}));

const allowedOrigins=(process.env.ALLOWED_ORIGINS||"https://vaishnavi-779.github.io,http://localhost:3000,http://127.0.0.1:3000")
  .split(",").map(s=>s.trim()).filter(Boolean);

app.use((req,res,next)=>{
  const origin=req.headers.origin;
  if(origin && allowedOrigins.includes(origin)) res.setHeader("Access-Control-Allow-Origin",origin);
  res.setHeader("Vary","Origin");
  res.setHeader("Access-Control-Allow-Headers","Content-Type");
  res.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS");
  if(req.method==="OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/api/health",(req,res)=>{
  res.json({
    ok:true,
    aiConfigured:Boolean(process.env.OPENAI_API_KEY),
    model:process.env.OPENAI_MODEL||"gpt-5.6-luna"
  });
});

const client=process.env.OPENAI_API_KEY
  ?new OpenAI({apiKey:process.env.OPENAI_API_KEY})
  :null;

const SYSTEM_INSTRUCTIONS=`You are ElectroAI, the dedicated expert electronics tutor inside ElectroGuide.

Your job is to answer the user's actual question, not just detect a component keyword. Never return a generic canned component definition when the user asks WHY, HOW, COMPARE, CALCULATE, DESIGN, DEBUG, or ANALYZE.

Scope:
- electronics and electrical engineering
- circuit analysis and design
- analog and digital electronics
- passive/active components and semiconductor devices
- op-amps, filters, power electronics and control
- microcontrollers, Arduino, ESP32, STM32 and embedded systems
- sensors, motors, displays and interfaces
- communication systems, RF basics, antennas and signal processing
- PCB, measurement instruments, troubleshooting and student projects
- electronics mathematics and numerical problems

Answering rules:
1. Directly answer the exact question first.
2. Explain the underlying reason and mechanism.
3. For calculations, show the formula, substitute values, calculate units, and state the result.
4. For comparisons, make the differences explicit and use a compact table when useful.
5. For circuits, describe current paths, voltage relationships, component roles, assumptions and expected behavior.
6. For troubleshooting, give an ordered diagnostic procedure and what each measurement means.
7. For design questions, give practical component-selection guidance and state assumptions.
8. If the answer depends on an exact datasheet or part number, say what must be checked instead of inventing specifications.
9. Distinguish ideal theory from real-world behavior.
10. Use clear language suitable for an ECE student, but handle advanced questions too.
11. Do not claim to see hardware, waveforms, schematics or measurements that the user did not provide.
12. Include safety warnings when working with mains voltage, high current, high voltage, batteries or hazardous hardware.
13. If a question is ambiguous, state the assumption you are using and answer under that assumption.
14. Do not repeat the same answer merely because the question mentions the same component. The user's intent and wording determine the answer.`;

app.post("/api/ask",async(req,res)=>{
  try{
    const question=String(req.body?.question||"").trim();
    const history=Array.isArray(req.body?.history)?req.body.history:[];

    if(!question)return res.status(400).json({error:"Please enter an electronics question."});
    if(question.length>4000)return res.status(400).json({error:"Question is too long."});
    if(!client)return res.status(503).json({error:"ElectroAI is not configured. Add OPENAI_API_KEY to the server environment."});

    const safeHistory=history
      .filter(m=>m && (m.role==="user"||m.role==="assistant") && typeof m.content==="string")
      .slice(-10)
      .map(m=>({role:m.role,content:m.content.slice(0,4000)}));

    const input=[
      ...safeHistory,
      {role:"user",content:question}
    ];

    const response=await client.responses.create({
      model:process.env.OPENAI_MODEL||"gpt-5.6-luna",
      instructions:SYSTEM_INSTRUCTIONS,
      input
    });

    const answer=response.output_text?.trim();
    if(!answer) return res.status(502).json({error:"The AI returned an empty answer."});
    res.json({answer});
  }catch(error){
    console.error("ElectroAI API error:",error);
    const status=error?.status||500;
    const message=error?.error?.message||error?.message||"Unknown server error";
    res.status(status).json({error:`ElectroAI API error (${status}): ${message}`});
  }
});

const port=Number(process.env.PORT)||3000;
app.listen(port,"0.0.0.0",()=>console.log(`ElectroGuide AI server running on port ${port}`));
