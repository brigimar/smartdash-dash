"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MoreVertical, CheckCheck, Bot, Signal, Wifi, Battery } from "lucide-react";
import { cn } from "@/lib/utils";

// --- TIPOS ---
// Definimos la interfaz flexible para aceptar los datos que vienen de la DB
interface MitigationStep {
  step_number?: string | number; // Puede venir como string o number de la DB
  title: string;
  description: string;
  [key: string]: any; // Permite otras propiedades
}

interface ChatMessage {
  id: string;
  role: "system" | "user";
  content: string;
  timestamp: string;
  isAction?: boolean;
}

interface WhatsAppChatProps {
  initialMessages: any[]; 
  mitigationSteps: MitigationStep[]; 
}

export function WhatsAppChat({ initialMessages, mitigationSteps }: WhatsAppChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al fondo
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Helper para hora actual
  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // --- LÓGICA DEL BOT (CEREBRO CORREGIDO) ---
  const handleBotResponse = async (userText: string) => {
    setIsTyping(true);
    
    // Simulamos tiempo de "pensar"
    await new Promise(r => setTimeout(r, 1000));

    let replyContent = "";
    const cleanInput = userText.trim(); // Limpiamos espacios
    const stepNumberToFind = parseInt(cleanInput);

    // 1. Lógica para Números (Pasos de Mitigación) - FIX APLICADO AQUÍ
    if (!isNaN(stepNumberToFind) && stepNumberToFind > 0) {
      
      // Búsqueda robusta: compara el número explícito O el índice + 1
      const step = mitigationSteps?.find((s, index) => {
         const explicitNumber = s.step_number ? Number(s.step_number) : null;
         return explicitNumber === stepNumberToFind || (index + 1) === stepNumberToFind;
      });
      
      if (step) {
        replyContent = `✅ *Detalle del Paso ${stepNumberToFind}:*\n\n*${step.title}*\n${step.description}`;
      } else {
        replyContent = `⚠️ No encuentro el paso ${stepNumberToFind}. Por favor asegúrate de elegir un número disponible en el menú (ej: 1 o 2).`;
      }
    } 
    // 2. Lógica para Confirmaciones (Agenda)
    else if (/(listo|ok|hecho|agendar|ya está|aplicado|gracias)/i.test(cleanInput)) {
      replyContent = `📅 *Entendido.* He registrado esta interacción en el seguimiento del caso. SmartDash monitoreará el impacto en el Score de Riesgo en las próximas 48hs.`;
    }
    // 3. Fallback
    else {
      replyContent = "No estoy seguro de entender. Por favor, escribe el *número* del paso que deseas consultar (ej: *1*) o confirma si ya lo has aplicado.";
    }

    const botMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "system",
      content: replyContent,
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  // --- INICIO SIMULACIÓN ---
  useEffect(() => {
    if (!initialMessages || initialMessages.length === 0) return;
    let isCancelled = false;

    const runSequence = async () => {
      setMessages([]);
      const dbNotification = initialMessages[0];

      // Espera inicial
      await new Promise(r => setTimeout(r, 800));
      if (isCancelled) return;

      // MENSAJE 1: Alerta General
      const msg1: ChatMessage = {
        id: "sys-1",
        role: "system",
        content: `${dbNotification.message}\n\n📉 Impacto Proyectado: *${dbNotification.impact}*`,
        timestamp: getCurrentTime()
      };
      setMessages(prev => [...prev, msg1]);

      // MENSAJE 2: Menú de Opciones (Bot)
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1200));
      if (isCancelled) return;
      setIsTyping(false);

      // Construimos el menú dinámicamente basado en los pasos reales
      const menuSteps = mitigationSteps.map((s, i) => {
         const num = s.step_number || i + 1;
         return `${num}️⃣ Paso ${num}: ${s.title}`;
      }).join("\n");

      const msg2: ChatMessage = {
        id: "sys-2",
        role: "system",
        content: `🤖 Soy tu Asistente de Riesgo.\n\nHe generado un plan de mitigación basado en los datos. Escribe el número para ver el detalle:\n\n${menuSteps || "Sin pasos disponibles."}\n\n¿Cuál deseas consultar?`,
        timestamp: getCurrentTime(),
        isAction: true
      };
      setMessages(prev => [...prev, msg2]);
    };

    runSequence();
    return () => { isCancelled = true; };
  }, [initialMessages, mitigationSteps]);


  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: getCurrentTime()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    handleBotResponse(input);
  };

  // --- RENDERIZADO CON ESTILO DE TELÉFONO ---
  return (
    // Contenedor principal que centra el teléfono en el sidebar
    <div className="flex h-full items-center justify-center p-4 bg-gray-50/50">
      
      {/* EL TELÉFONO (Marco Negro) */}
      <div className="relative w-full max-w-[360px] h-[700px] bg-black rounded-[2.5rem] p-3 shadow-2xl border-[3px] border-gray-800 ring-4 ring-gray-900/40 z-20 overflow-hidden">
        
        {/* LA PANTALLA (Contenido del Chat) */}
        <div className="flex flex-col h-full bg-[#efeae2] relative overflow-hidden font-sans rounded-[1.8rem] z-10">
          
          {/* Background Pattern de WhatsApp */}
          <div className="absolute inset-0 opacity-[0.08] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat pointer-events-none" />

          {/* iOS Status Bar (Falso) */}
          <div className="bg-[#F0F2F5] px-5 py-1 flex justify-between items-center text-[10px] font-medium text-gray-900 z-20 pt-2">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                  <Signal size={12} className="fill-current" />
                  <Wifi size={12} />
                  <Battery size={14} className="fill-current" />
              </div>
          </div>

          {/* Header del Chat */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#F0F2F5] border-b border-gray-300 z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 cursor-pointer ring-1 ring-gray-200">
                <AvatarImage src="/bot-avatar.png" /> 
                <AvatarFallback className="bg-emerald-600 text-white font-bold"><Bot size={18}/></AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm leading-none flex items-center gap-1">
                  SmartDash AI <CheckCheck className="text-emerald-500 h-3 w-3" />
                </span>
                <span className="text-[11px] text-emerald-600 font-medium animate-pulse truncate">
                  {isTyping ? "Escribiendo..." : "En línea"}
                </span>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="text-emerald-600 h-8 w-8">
              <MoreVertical size={18} />
            </Button>
          </div>

          {/* Area de Mensajes */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 relative z-10 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex w-full animate-in fade-in slide-in-from-bottom-1 duration-200", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] text-[13px] leading-relaxed relative", 
                  msg.role === "user" ? "bg-[#d9fdd3] text-gray-900 rounded-tr-none" : "bg-white text-gray-900 rounded-tl-none"
                )}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <span className="text-[10px] text-gray-400/80 block text-right mt-1 flex justify-end items-center gap-0.5">
                    {msg.timestamp} {msg.role === "user" && <CheckCheck size={13} className="text-blue-400" />}
                  </span>
                   {/* Triangulito del globo */}
                   <div className={cn("absolute top-0 w-0 h-0 border-t-[8px] border-t-transparent", 
                      msg.role === "user" ? "-right-2 border-l-[8px] border-l-[#d9fdd3]" : "-left-2 border-r-[8px] border-r-white")} 
                   />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in">
                 <div className="bg-white rounded-xl rounded-tl-none px-3 py-2 shadow-sm flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                 </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="bg-[#F0F2F5] p-2 flex items-end gap-2 z-10 pb-4">
            <div className="flex-1 bg-white rounded-2xl flex items-center px-3 py-1 shadow-sm border border-gray-100">
              <Input 
                 className="border-0 shadow-none focus-visible:ring-0 h-8 px-0 text-[13px] bg-transparent placeholder:text-gray-400"
                 placeholder="Escribe un mensaje..."
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
            </div>
            <Button 
               size="icon" 
               className={cn("rounded-full h-10 w-10 transition-all shadow-sm shrink-0", input.trim() ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-gray-200 text-gray-500")}
               onClick={handleSend}
               disabled={!input.trim()}
             >
              <Send size={18} className={cn(input.trim() ? "ml-0.5" : "")} />
            </Button>
          </div>
        </div> {/* Fin Pantalla */}
        
        {/* Botón Home Falso (Opcional, línea inferior) */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-800 rounded-full z-30"></div>

      </div> {/* Fin Teléfono */}
    </div>
  );
}