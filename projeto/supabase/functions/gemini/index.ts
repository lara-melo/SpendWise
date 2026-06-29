import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, payload } = await req.json()
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY não configurada no Edge Function')
    }

    let requestBody: any = {};
    
    if (action === 'categorize') {
      const { descricao, valor } = payload;
      requestBody = { contents: [{ parts: [{ text: `Você é um assistente financeiro. Um usuário cadastrou uma transação com a descrição "${descricao}" no valor de R$ ${valor}. Retorne APENAS o nome de uma categoria adequada (ex: Alimentação, Lazer, Transporte, Moradia, Saúde, Educação, Salário, Outros). Não escreva mais nada.` }] }] };
    } else if (action === 'insight') {
      const { jsonResumo } = payload;
      requestBody = { contents: [{ parts: [{ text: `Você é o consultor financeiro SpendWise. Analise os gastos do usuário abaixo e dê uma dica de insight personalizada baseada nos excessos ou economias do mês.\nDados do mês: ${JSON.stringify(jsonResumo)}` }] }] };
    } else if (action === 'mentor') {
      const { dadosJSON } = payload;
      requestBody = { contents: [{ parts: [{ text: `Você é um educador financeiro. Analise o seguinte JSON de gastos de um adolescente. 1) Aponte para onde foi a maior parte do dinheiro (usando os dados das categorias). 2) Avalie se ele gastou mais do que ganhou no mês. 3) Olhando a tendência, diga se ele está melhorando. Use um tom didático, direto e encorajador. Limite-se a um parágrafo curto.\n\nJSON de Gastos:\n${JSON.stringify(dadosJSON)}` }] }] };
    } else if (action === 'chat') {
      const { history, personality, dadosJSON, newMessage } = payload;
      let contextMsg = `[Você é o Mentor IA da SpendWise. Personalidade: ${personality || 'Educador Didático'}. Dados do mês: ${JSON.stringify(dadosJSON)}. REGRA ESTRITA: Você está EXPRESSAMENTE PROIBIDO de responder a qualquer pergunta ou discutir qualquer assunto que não seja sobre Finanças Pessoais, Educação Financeira ou sobre o sistema SpendWise. Se o usuário perguntar sobre qualquer outra coisa (como gramática, história, conhecimentos gerais, programação, etc), recuse-se a responder educadamente dizendo que seu foco exclusivo são finanças.]`;
      
      if (!history || history.length === 0) {
        contextMsg += `\nFaça uma análise dos gastos deste mês em um parágrafo, aponte onde gastei mais e dê dicas.`;
      } else {
        contextMsg += `\nMensagem do Usuário: ${newMessage}`;
      }
      
      const contents = history ? [...history] : [];
      contents.push({ role: 'user', parts: [{ text: contextMsg }] });
      
      requestBody = { contents };
    } else {
      throw new Error('Ação inválida')
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Erro Gemini: ${data.error?.message || 'Falha desconhecida'}`);
    }

    return new Response(
      JSON.stringify({ result: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  }
})
