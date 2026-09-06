require("dotenv").config();
const path=require("path");
const express=require("express");
const OpenAI=require("openai");

const app=express();
app.use(express.json({limit:"64kb"}));
app.use(express.static(__dirname));

const client=process.env.OPENAI_API_KEY?new OpenAI({apiKey:process.env.OPENAI_API_KEY}):null;

app.post("/api/ask",async(req,res)=>{
  try{
    const question=String(req.body?.question||"").trim();
    if(!question)return res.status(400).json({error:"Please enter an electronics question."});
    if(question.length>4000)return res.status(400).json({error:"Question is too long."});
    if(!client)return res.status(503).json({error:"ElectroAI is not configured yet. Add OPENAI_API_KEY to the server environment."});

    const response=await client.responses.create({
      model:process.env.OPENAI_MODEL||"gpt-5.6-luna",
      instructions:"You are ElectroAI, the electronics tutor inside ElectroGuide. Answer electronics, ECE, embedded systems, circuits, components, microcontrollers, sensors, communication, power electronics and project questions. Explain clearly for an ECE student. Use equations when useful, step-by-step reasoning, practical examples and safety/voltage warnings where relevant. If a component value or specification depends on an exact part number, say so instead of inventing it. Do not claim to see hardware that was not provided.",
      input:question
    });
    res.json({answer:response.output_text||"I could not generate an answer."});
  }catch(error){
    console.error("ElectroAI API error:",error);
    const status=error?.status||500;
    const message=error?.error?.message||error?.message||"Unknown server error";
    res.status(status).json({error:`ElectroAI API error (${status}): ${message}`});
  }
});

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`ElectroGuide running at http://localhost:${port}`));
