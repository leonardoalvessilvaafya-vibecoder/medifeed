import { useState, useRef, useEffect, useCallback } from "react";

const SPECIALTY_COLORS = {
  "Pediatria":        { base:"#4A519B", grad:"linear-gradient(160deg,#1e2148 0%,#2e3370 50%,#4A519B 100%)" },
  "Psiquiatria":      { base:"#40538D", grad:"linear-gradient(160deg,#1a2240 0%,#283660 50%,#40538D 100%)" },
  "Dermatologia":     { base:"#A37171", grad:"linear-gradient(160deg,#3d2020 0%,#6b3838 50%,#A37171 100%)" },
  "Cardiologia":      { base:"#9E4A63", grad:"linear-gradient(160deg,#3d1020 0%,#6b2040 50%,#9E4A63 100%)" },
  "Endocrinologia":   { base:"#8C2F68", grad:"linear-gradient(160deg,#2a0e26 0%,#5c1f48 50%,#8C2F68 100%)" },
  "Ginecologia":      { base:"#985187", grad:"linear-gradient(160deg,#2e0d2b 0%,#5c2252 50%,#985187 100%)" },
  "Gastroenterologia":{ base:"#35A1A5", grad:"linear-gradient(160deg,#0d3033 0%,#1e6568 50%,#35A1A5 100%)" },
};
let _altIdx = 0;
const GENERAL_COLORS = [
  { base:"#2261B1", grad:"linear-gradient(160deg,#0a1e40 0%,#133a7a 50%,#2261B1 100%)" },
  { base:"#82204A", grad:"linear-gradient(160deg,#2d0618 0%,#5a1133 50%,#82204A 100%)" },
];
const getSpecialtyColor = s => {
  for(const k of Object.keys(SPECIALTY_COLORS)) if(s.includes(k)) return SPECIALTY_COLORS[k];
  return GENERAL_COLORS[_altIdx++ % 2];
};

const AUTHORS = {
  "Afya": { image:"/afya-logo.png", bio:`Afya – que significa "saúde e bem-estar" no dialeto africano suaíli – nasceu da união da NRE Educacional, maior grupo de faculdades de Medicina do país (criado em 1999), com a MEDCEL, marca de cursos preparatórios para prova de residência médica. A primeira faculdade do grupo começou a operar em Tocantins, no Norte do país.\n\nCom sede em Nova Lima (MG), a Afya é uma companhia de capital aberto, com ações negociadas na bolsa de valores NASDAQ, nos Estados Unidos, desde 2019.\n\nMissão: Integrar educação e soluções para a prática médica, potencializando formação, atualização, assertividade, produtividade e conexão dos médicos com o ecossistema de saúde.\n\nPropósito: Transformar a saúde em conjunto com quem tem a Medicina como vocação.` },
  "Dra. Fernanda Lima": { bio:"Médica especialista em medicina do trabalho e saúde integrativa. Doutora pela USP, com mais de 15 anos de experiência em bem-estar de profissionais de saúde. Autora do livro 'Médicos também adoecem'." },
  "Dr. Rafael Monteiro": { bio:"Cardiologista intervencionista formado pelo InCor-HCFMUSP. Fellow do American College of Cardiology. Pesquisador nas áreas de insuficiência cardíaca e dispositivos implantáveis." },
  "Dra. Camila Souza": { bio:"Endocrinologista com fellowship em diabetes e doenças da tireoide pela UNIFESP. Membro da Sociedade Brasileira de Endocrinologia e Metabologia. Apaixonada por educação médica continuada." },
  "Ícaro Sampaio": { bio:"Graduação em Medicina pela Universidade Federal do Vale do São Francisco. Residência em Clínica Médica pelo Hospital Regional de Juazeiro - BA. Residência em Endocrinologia e Metabologia pelo Hospital das Clínicas da UFPE. Título de Especialista pela Sociedade Brasileira de Endocrinologia e Metabologia. Médico Assistente e Preceptor no Serviço de Endocrinologia do Hospital das Clínicas da UFPE." },
  "Ariane Vieira Scarlatelli Macedo": { bio:"Médica cardiologista com atuação em cardio-oncologia. Revisão científica por Gabriel Quintino. Publicado em 25 de maio de 2026 no Portal Afya." },
  "Dr. Bruno Alves": { bio:"Neurologista clínico e neurofisiologista. Especialização em neurologia vascular pela Santa Casa de São Paulo. Coordenador do Protocolo de AVC do Hospital das Clínicas." },
  "Juliane Braziliano": { bio:"Médica com atuação em Endocrinologia e Metabologia. Publicado em 23 de maio de 2026 no Portal Afya." },
};

const avatarColors = ["#e94560","#f48fb1","#64b5f6","#81c784","#ce93d8","#ffb74d"];
const getAvatarColor = n => avatarColors[n.charCodeAt(0) % avatarColors.length];
const getInitials = n => n.split(" ").slice(0,2).map(w=>w[0]).join("");

const Avatar = ({ name, size=28 }) => {
  const img = AUTHORS[name]?.image;
  if (img) return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:"1.5px solid rgba(255,255,255,0.3)"}}>
      <img src={img} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
    </div>
  );
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:getAvatarColor(name),
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.38,fontWeight:700,color:"white",flexShrink:0,
      border:"1.5px solid rgba(255,255,255,0.3)"}}>
      {getInitials(name)}
    </div>
  );
};

const VIDEOS = [
  { type:"video", specialty:"Afya News", author:"Afya", time:"Há 3h", duration:2, title:"22/05/26 | Afya News: Receitas Digitais, Dulaglutida na Visão e Inovação no SUS", saves:38, likes:43, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779452047/21_05_26___Afya_News__Alerta_OPAS_para_Ebola_V%C3%ADrus_Andes_e_Cuidado_Feminino_bh7mjk.mp4" },
  { type:"video", specialty:"Carreira", author:"Afya", time:"Há 2h", duration:38, durationUnit:"seg", title:"Carreira médica sustentável: O que avaliar a longo prazo? | Afya Responde", saves:12, likes:18, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779707311/Carreira_m%C3%A9dica_sustent%C3%A1vel_O_que_avaliar_a_longo_prazo_Afya_Responde_opmpgi.mp4" },
  { type:"video", specialty:"Endocrinologia", author:"Ícaro Sampaio", time:"Há 15min", duration:25, durationUnit:"seg", title:"Canetas emagrecedoras: precisam ser utilizadas com responsabilidade | Afya News", saves:25, likes:31, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779707317/Canetas_emagrecedoras_precisam_ser_utilizadas_com_responsabilidade_Afya_News_f8pqpn.mp4" },
  { type:"video", specialty:"Afya Responde", author:"Afya", time:"Há 32min", duration:36, durationUnit:"seg", title:"A especialização médica impulsiona a carreira? | Afya Responde", saves:20, likes:36, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779711096/A_especializa%C3%A7%C3%A3o_m%C3%A9dica_impulsiona_a_carreira_Afya_Responde_lzpy5e.mp4" },
  { type:"video", specialty:"Cardiologia", author:"Dr. Rafael Monteiro", time:"Há 1h", duration:12, title:"Manejo da fibrilação atrial: do diagnóstico ao controle do ritmo em 2025", saves:61, likes:87, refs:"https://pubmed.ncbi.nlm.nih.gov" },
  { type:"video", specialty:"Endocrinologia", author:"Dra. Camila Souza", time:"Há 3h", duration:9, title:"Obesidade e GLP-1: o que mudou na prática clínica com semaglutida e tirzepatida", saves:42, likes:62, refs:"https://pubmed.ncbi.nlm.nih.gov" },
  { type:"video", specialty:"Neurologia", author:"Dr. Bruno Alves", time:"Há 5h", duration:7, title:"Cefaleia em salvas: diagnóstico diferencial e abordagem terapêutica atualizada", saves:44, likes:53 },
];
const QUIZZES = [
  { type:"quiz", specialty:"Dermatologia", author:"Marselle Codeço Barreto", time:"5 mai 2026", duration:1, title:"Dermatoscopia de lesões azuis: como não deixar passar um melanoma?", intro:"Paciente masculino, 80 anos, sem histórico prévio de melanoma, comparece na consulta dermatológica de rotina, na qual é notada lesão azulada no membro superior, demonstrada a seguir. O paciente não soube relatar o tempo de evolução da lesão.", img:"/lesao-azul.png", q:"Diante desse caso, quais são as pistas dermatoscópicas de benignidade presentes na lesão?", opts:["Presença de vasos lineares irregulares","Véu azul-esbranquiçado e localização anatômica","Pigmentação azul homogênea difusa sem estruturas adicionais","Cor azul periférica ou em manchas"], correct:2, saves:34, comment:"A pigmentação azul homogênea difusa sem estruturas adicionais é o padrão dermatoscópico clássico do nevo azul, uma lesão melanocítica benigna.\n\nO nevo azul origina-se de melanócitos dendríticos aprisionados na derme profunda. A coloração azul resulta do efeito de Tyndall: a melanina em posição profunda na derme scatters a luz de comprimento de onda curto, refletindo a cor azul-acinzentada aos olhos do observador.\n\nNa dermatoscopia, o nevo azul apresenta pigmentação azul-acinzentada homogênea, uniforme e sem estruturas adicionais — ausência de rede atípica, vasos irregulares, véu azul-esbranquiçado ou áreas de regressão.\n\nAtenção ao diagnóstico diferencial com o melanoma nodular azul-negro, que pode apresentar estruturas de malignidade: véu azul-esbranquiçado, vasos em saca-rolhas, pontos e glóbulos irregulares e regressão. A localização anatômica isoladamente não é critério de benignidade.\n\nEm casos de dúvida — lesão de surgimento recente, crescimento rápido, sangramento ou lesão > 1 cm —, a biópsia excisional é mandatória.", commentRef:"Barreto MC. Dermatoscopia de lesões azuis: como não deixar passar um melanoma. Portal Afya, 5 mai 2026.", likes:41, refs:"https://portal.afya.com.br/quiz/dermatologia/quiz-dermatoscopia-de-lesoes-azuis-como-nao-deixar-passar-um-melanoma" },
  { type:"quiz", specialty:"Clínica Médica", author:"Daniela Cristina Cardoso Lima Estrella", time:"3 abr 2026", duration:3, title:"Caso clínico: Você sabe diagnosticar corretamente este caso de tontura?", intro:"Mulher, 66 anos, procura atendimento por episódios recorrentes de tontura e lipotímia ao usar o braço esquerdo em atividades como pentear cabelo ou carregar sacolas. Relata fadiga precoce no membro superior esquerdo durante esforços. Antecedentes: hipertensão arterial sistêmica, dislipidemia e tabagismo (40 maços-ano).\n\nExame físico: PA braço direito 144/90 mmHg, PA braço esquerdo 114/72 mmHg. Pulso radial esquerdo diminuído em relação ao direito. Pulsos femorais normais bilateralmente. Exame neurológico sem alterações.", q:"Qual é o mecanismo fisiopatológico mais provável responsável pelo quadro?", opts:["Vasoespasmo de artérias cerebrais","Fluxo retrógrado em artéria vertebral","Diminuição da perfusão cerebral por hipotensão sistêmica","Embolização de placa aterosclerótica carotídea"], correct:1, saves:43, comment:"O quadro é característico da Síndrome do Roubo da Subclávia (SRS), causada por estenose ou oclusão da artéria subclávia esquerda proximal à origem da artéria vertebral esquerda.\n\nO mecanismo central é o fluxo retrógrado na artéria vertebral esquerda: durante o exercício do membro superior esquerdo, a demanda de fluxo aumenta. Como a subclávia está obstruída proximalmente, o sangue é desviado ('roubado') da circulação vertebrobasilar via fluxo retrógrado na vertebral ipsilateral, causando isquemia transitória do tronco encefálico — daí a tontura e a lipotímia desencadeadas pelo uso do braço.\n\nA diferença de pressão arterial entre os membros superiores ≥ 15–20 mmHg é o principal sinal clínico da SRS. Neste caso, a diferença foi de 30 mmHg (144/90 no direito vs 114/72 no esquerdo), associada a pulso radial esquerdo diminuído, confirmando o diagnóstico.\n\nO tabagismo, a hipertensão e a dislipidemia são os principais fatores de risco para a doença aterosclerótica que leva à estenose da subclávia.\n\nO diagnóstico é confirmado pelo Doppler de vasos do pescoço e membros superiores, que evidencia o fluxo retrógrado na vertebral. O tratamento é endovascular (angioplastia com stent) ou cirúrgico (bypass subclávia-carótica).", commentRef:"Estrella DCCL. Caso clínico: tontura e assimetria de pulsos. Portal Afya, 3 abr 2026.", likes:57, refs:"https://portal.afya.com.br/quiz/clinica-medica/caso-clinico-voce-sabe-diagnosticar-corretamente-este-caso-de-tontura" },
  { type:"quiz", specialty:"Ortopedia", author:"Afya", time:"3 mai 2026", duration:2, title:"Quiz: Fratura diafisária do terço médio da clavícula", intro:"Paciente adulto após trauma direto no ombro evolui com dor intensa, edema e limitação funcional do membro superior. Ao exame físico, há sensibilidade e deformidade palpável sobre a clavícula. Radiografia em incidência de Zanca evidencia fratura diafisária do terço médio da clavícula. A maioria dessas fraturas ocorre nessa região, representando cerca de 70–80% dos casos.", q:"Em relação ao manejo das fraturas do terço médio da clavícula, assinale a alternativa correta.", opts:["O tratamento conservador com tipoia ou enfaixamento em '8' permanece como opção padrão para fraturas sem desvio significativo","Fraturas expostas e com comprometimento neurovascular não constituem indicação de cirurgia emergente","Os resultados funcionais em seis meses são consistentemente superiores no tratamento conservador, independentemente da gravidade da fratura","A indicação cirúrgica de rotina está recomendada para todas as fraturas do terço médio, mesmo as pouco deslocadas"], correct:0, saves:31, comment:"O tratamento conservador — tipoia simples ou enfaixamento em '8' — é a conduta padrão para fraturas do terço médio da clavícula sem desvio significativo, com excelentes resultados na maioria dos pacientes.\n\nAs indicações cirúrgicas clássicas incluem: fratura exposta (emergência), comprometimento neurovascular, encurtamento > 1,5–2 cm, fratura cominutiva com grande desvio, ombro flutuante, e falha do tratamento conservador. Fraturas expostas e com lesão neurovascular constituem, sim, indicações de cirurgia de urgência — tornando a alternativa B falsa.\n\nEstudos comparativos mostram que, para fraturas com desvio significativo, o tratamento cirúrgico (fixação com placa ou haste) pode oferecer retorno mais rápido à função e menor taxa de não-união. Porém, não há superioridade consistente do conservador para todos os casos — tornando a alternativa C falsa.\n\nA alternativa D é incorreta porque a indicação cirúrgica de rotina não se aplica a fraturas pouco deslocadas, nas quais o tratamento conservador tem resultados equivalentes com menor morbidade.\n\nO seguimento radiológico em 4–6 semanas é recomendado para avaliar consolidação e identificar casos que possam se beneficiar de intervenção tardia.", commentRef:"Afya. Quiz: Fratura diafisária do terço médio da clavícula. Portal Afya, 3 mai 2026.", likes:36, refs:"https://portal.afya.com.br/quiz/ortopedia/quiz-fratura-diafisaria-do-terco-medio-da-clavicula" },
  { type:"quiz", specialty:"Gastroenterologia", author:"Dra. Fernanda Lima", time:"Há 45min", q:"Qual é o principal fator de risco para adenocarcinoma de esôfago?", opts:["H. pylori","Esôfago de Barrett","Acalasia","Doença de Crohn"], correct:1, saves:29, comment:"O esôfago de Barrett é a principal lesão precursora do adenocarcinoma de esôfago, resultante da metaplasia intestinal do epitélio esofágico em resposta à exposição crônica ao ácido gástrico e bile.\n\nA progressão de Barrett sem displasia para adenocarcinoma ocorre em cerca de 0,1 a 0,3% ao ano. A presença de displasia de alto grau eleva esse risco substancialmente, justificando vigilância endoscópica intensiva e tratamento endoscópico ou cirúrgico precoce.\n\nO H. pylori está associado ao adenocarcinoma gástrico, não esofágico. A acalasia eleva o risco de carcinoma espinocelular de esôfago, não adenocarcinoma. O controle do refluxo gastroesofágico é a principal estratégia de prevenção primária do Barrett e sua progressão maligna.", commentRef:"Shaheen NJ et al. ACG Clinical Guideline: Diagnosis and Management of Barrett's Esophagus. Am J Gastroenterol. 2022.", likes:38, refs:"https://www.febrasgo.org.br" },
];
const ARTICLES = [
  { type:"article", specialty:"Cardiologia", author:"Ariane Vieira Scarlatelli Macedo", time:"Há 1h", duration:14, title:"Cardio-oncologia na prática: uma nova fronteira no cuidado do paciente com câncer", body:"Quando falamos do cuidado cardiovascular em nossos consultórios, nossa mente se volta imediatamente para condições como hipertensão, dislipidemia, doença coronária e insuficiência cardíaca. No entanto, um grupo de pacientes está crescendo em prevalência e complexidade, exigindo um olhar mais integrado: aqueles que estão em tratamento oncológico ou que o concluíram. Graças ao avanço das terapias oncológicas, esses pacientes estão vivendo mais, mas essa sobrevida aumentada expõe uma nova realidade: um risco cardiovascular significativamente maior.\n\nA abordagem tradicional de esperar que a cardiotoxicidade se manifeste para então tratá-la já não é suficiente. É fundamental abandonar essa visão reativa em favor de uma estratégia proativa, que reconhece o risco cardiovascular como um componente intrínseco da jornada oncológica desde o seu diagnóstico. Esse risco não surge apenas como consequência do tratamento, mas é influenciado por uma complexa interação de fatores — a própria biologia tumoral, o estado inflamatório sistêmico e as terapias oncológicas, que embora essenciais para a cura, podem atuar como gatilhos diretos para complicações cardiovasculares.\n\nCompreender as vias biológicas compartilhadas entre o câncer e a doença cardiovascular é o que fundamenta a prática clínica em cardio-oncologia. As duas condições frequentemente se encontram porque compartilham mecanismos fisiopatológicos comuns: inflamação crônica que acelera processos ateroscleróticos, disfunção endotelial que favorece a trombose, alterações metabólicas como resistência à insulina e dislipidemia, e estresse oxidativo que causa dano direto ao miocárdio e aos vasos.\n\nA avaliação realizada antes do início do tratamento oncológico é, talvez, o passo mais determinante para o sucesso da jornada do paciente. Uma avaliação basal estruturada ideal inclui anamnese e exame físico com foco em fatores de risco, eletrocardiograma, biomarcadores como troponinas e peptídeos natriuréticos, e ecocardiograma com strain longitudinal global. O strain, em particular, permite identificar vulnerabilidades subclínicas que passam despercebidas na avaliação convencional — uma queda maior que 15% em relação ao basal é sinal de alerta para cardiotoxicidade incipiente.\n\nO risco cardiovascular não desaparece ao final da última sessão de quimioterapia ou radioterapia. Para muitos sobreviventes de câncer, o risco permanece elevado por toda a vida. A cardio-oncologia não é mais uma subespecialidade de nicho — ela já faz parte do cotidiano de todos os cardiologistas. Ao final, nossa missão é permitir que o paciente não apenas sobreviva ao câncer, mas que tenha uma vida plena depois dele, com o coração preservado e confiança para seguir em frente.", saves:73, likes:89, refs:"https://portal.afya.com.br/cardiologia/cardio-oncologia-na-pratica-uma-nova-fronteira-no-cuidado-do-paciente-com-cancer" },
  { type:"article", specialty:"Endocrinologia", author:"Juliane Braziliano", time:"Há 3h", duration:15, title:"Uso da tirzepatida no tratamento de DM2 em crianças e adolescentes", body:"A tirzepatida é um medicamento que vem ganhando destaque no tratamento de diabetes mellitus tipo 2 (DM2) e obesidade. Recentemente, foi publicado o estudo SURPASS-PED, um ensaio clínico duplo-cego, randomizado, placebo-controlado e de fase 3, que avaliou a eficácia e segurança da tirzepatida no tratamento de crianças e adolescentes com DM2.\n\nA prevalência de DM2 de início na juventude vem crescendo de forma alarmante ao redor do mundo, com incidência dobrada nas últimas duas décadas nos Estados Unidos. Esse tipo é mais agressivo que o DM2 de início na fase adulta, sendo caracterizado por maior resistência insulínica, rápido declínio da função das células β e maior risco de complicações micro e macrovasculares.\n\nA tirzepatida é um inibidor duplo de longa duração dos receptores GIP e GLP-1, aprovada para tratamento de DM2 em adultos em doses semanais de 2,5 mg a 15 mg. O SURPASS-PED é o primeiro estudo a avaliar especificamente sua eficácia em crianças e adolescentes com controle inadequado em uso de metformina e/ou insulina basal.\n\nForam randomizados 99 participantes entre 10 e 18 anos (61% mulheres, idade média 14,7 anos, HbA1c média 8,04%) para receber tirzepatida 5 mg/semana, 10 mg/semana ou placebo por 30 semanas, seguidas de extensão aberta de 22 semanas. Os desfechos avaliados incluíram HbA1c, IMC, glicemia de jejum, parâmetros pressóricos, lipídicos e qualidade de vida.\n\nNa semana 30, a tirzepatida reduziu a HbA1c em 2,23% versus aumento de 0,05% no grupo placebo. Ao final das 30 semanas, 86% dos pacientes em uso de tirzepatida atingiram HbA1c < 6,5% e 60% atingiram HbA1c < 5,7%. A medicação também reduziu o IMC em 7,4% (dose 5 mg) e 11,2% (dose 10 mg), frente a 0,4% no placebo.\n\nAlém da melhora glicêmica e do IMC, os grupos tratados com tirzepatida apresentaram redução significativa de circunferência abdominal, níveis pressóricos, triglicerídeos, colesterol total, LDL e VLDL, além de melhora na qualidade de vida. Os efeitos colaterais mais comuns foram gastrointestinais, de intensidade leve a moderada, com redução gradual ao longo do tempo. A eficácia foi comparável à observada em adultos e nenhuma morte ocorreu durante o estudo.\n\nA tirzepatida em doses semanais de 5 a 10 mg demonstrou benefícios glicêmicos e no IMC superiores ao placebo em crianças e adolescentes com DM2, com efeitos sustentados por 1 ano de seguimento. Esses achados reforçam a tirzepatida como opção terapêutica segura e eficaz nessa população.", saves:61, likes:74, refs:"https://portal.afya.com.br/endocrinologia/uso-da-tirzepatida-no-tratamento-de-dm2-em-criancas-e-adolescentes" },
  { type:"article", specialty:"Gastroenterologia", author:"Dra. Fernanda Lima", time:"Há 35min", duration:4, title:"Doença inflamatória intestinal: biomarcadores, biologics e o futuro do tratamento", body:"A doença de Crohn e a retocolite ulcerativa representam dois dos maiores desafios da gastroenterologia moderna. A introdução dos agentes biológicos — anti-TNF, anti-integrinas e inibidores de IL-12/23 — transformou os objetivos do tratamento, que agora miram a remissão endoscópica e a cicatrização mucosa. O monitoramento com calprotectina fecal e PCR ultrassensível permite ajuste terapêutico antes da recidiva clínica, reduzindo hospitalizações e cirurgias.\n\nA estratégia treat-to-target, incorporada às diretrizes do ECCO, exige reavaliações endoscópicas periódicas para confirmar a remissão histológica, hoje considerada o desfecho mais ambicioso e possivelmente mais protetor contra complicações a longo prazo. O monitoramento dos níveis séricos dos biológicos e a pesquisa de anticorpos anti-droga tornaram-se ferramentas essenciais para otimizar a terapia e evitar perda de resposta secundária, que acomete até 50% dos pacientes em uso de anti-TNF após 5 anos.\n\nO futuro do tratamento aponta para a medicina de precisão, com perfis genômicos e transcriptômicos da mucosa intestinal orientando a seleção do biológico mais adequado a cada fenótipo. Novos alvos moleculares, como os inibidores de JAK (tofacitinibe, upadacitinibe) e os anti-IL-23 de nova geração (risanquizumabe, mirikizumabe), ampliam o arsenal terapêutico disponível e oferecem opções seguras para pacientes refratários às classes anteriores.", saves:49, likes:53 },
];

const CONTENT = [];
const N = Math.min(VIDEOS.length, QUIZZES.length, ARTICLES.length);
for(let i=0;i<N;i++){ CONTENT.push(VIDEOS[i]); CONTENT.push(QUIZZES[i]); CONTENT.push(ARTICLES[i]); }
CONTENT.forEach(c => { const col=getSpecialtyColor(c.specialty); c.bg=col.grad; c.accent=col.base; c.bgBase=col.base; });

const EXTRA_CONTENT = [
  { type:"video", specialty:"Afya News", author:"Afya", time:"28 mai 2026", duration:3,
    title:"28/05/26 | Afya News: Imunização contra VSR, OMS prioriza doença hepática e hábitos no envelhecimento",
    saves:27, likes:34,
    videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1780069406/28_05_26___Afya_News_Imuniza%C3%A7%C3%A3o_contra_VSR_OMS_prioriza_doen%C3%A7a_hep%C3%A1tica_e_h%C3%A1bitos_no_envelhecimento.publer.com_rczyli.mp4" },
  { type:"article", specialty:"Ginecologia e Obstetrícia", author:"Redação Afya", time:"27 mai 2026", duration:2,
    title:"CBGO 2026: Simpósio Satélite Afya aborda manejo de úlceras genitais",
    body:"O Portal Afya acompanha a cobertura do 63º Congresso Brasileiro de Ginecologia e Obstetrícia (CBGO 2026), um dos principais encontros científicos da especialidade no país. O evento será realizado entre 27 e 30 de maio de 2026, no Minascentro, em Belo Horizonte, Minas Gerais, reunindo ginecologistas, obstetras, residentes, estudantes de medicina e demais profissionais interessados nas atualizações em saúde da mulher.\n\nPromovido pela Federação Brasileira das Associações de Ginecologia e Obstetrícia (Febrasgo), o congresso possui programação científica voltada à atualização clínica, discussão de condutas, atividades práticas e integração entre especialistas de diferentes áreas da Ginecologia e Obstetrícia.\n\nDurante o CBGO 2026, a Afya realizará o Simpósio Satélite \"Úlceras genitais: imagens e respostas — novo algoritmo da Sociedade Internacional no auxílio do manejo\", ministrado pela ginecologista Caroline Alves de Oliveira Martins, editora-chefe de Ginecologia e Obstetrícia dos produtos digitais da Afya. A atividade abordará, de forma prática e visual, o manejo de úlceras genitais a partir de um novo algoritmo internacional. O simpósio também contará com o médico Járder Burdet, professor e editor-chefe da Afya GO.\n\nData: 29/05/2026 — 12h20 às 13h20 | Auditório D, Minas Centro. Palestrantes: Caroline Oliveira e Járder Burdet.",
    saves:18, likes:24,
    refs:"https://portal.afya.com.br/ginecologia-e-obstetricia/cbgo-2026-confira-a-cobertura" },
  { type:"article", specialty:"Cardiologia", author:"Juliana Avelar", time:"28 mai 2026", duration:12,
    title:"Cuidado pós-parto para pacientes com doença cardiovascular: ACC 2026",
    body:"O período pós-parto é uma oportunidade crítica para engajamento na melhora dos desfechos cardiometabólicos de curto e longo prazo. Mais da metade das mortes relacionadas à gestação ocorre após o nascimento do bebê, e morbidade substancial surge no período pós-parto precoce. Durante essas primeiras semanas, aproximadamente 60% dos casos de insuficiência cardíaca associada à gravidez ocorrem, e o risco de acidente vascular cerebral hemorrágico aumenta em mais de quatro vezes.\n\nOs indivíduos de maior risco incluem não apenas aqueles com doenças cardíacas, mas também aqueles com fatores de risco como hipertensão, obesidade e dislipidemia, além de fatores amplificadores como desfechos adversos da gestação — diabetes gestacional, distúrbios hipertensivos da gravidez e parto prematuro.\n\nUma revisão dos Maternal Mortality Review Committees estaduais identificou fatores relacionados ao profissional de saúde como o principal responsável por 34,8% de todas as mortes maternas, incluindo falha em reconhecer doença crítica, oferta de tratamento ineficaz e falha em encaminhamento. Outros 21,7% das mortes estiveram relacionados a falta de comunicação e coordenação inadequada do cuidado.\n\nA amamentação associa-se à melhora da saúde cardiometabólica materna a longo prazo. As evidências atuais indicam que a amamentação não se associa a piora da função cardíaca em pessoas com cardiopatias estruturais, incluindo cardiomiopatia periparto. O arsenal de medicações seguras na lactação é maior do que durante a gravidez — a maioria das medicações cardiovasculares é compatível com amamentação.\n\nO planejamento contraceptivo deve começar ainda no período antenatal. Pílulas contendo apenas progesterona são consideradas seguras (MEC 1 ou 2) para todas as condições cardiovasculares durante o pós-parto e amamentação. O ACOG apoia inserção imediata pós-parto de métodos reversíveis de longa duração antes da alta hospitalar.\n\nA pressão arterial pós-parto é mais baixa no dia do parto, porém atinge pico ao redor de 5 a 7 dias, devido à mobilização de líquido extracelular. Esse aumento é mais pronunciado em pacientes com distúrbios hipertensivos, elevando o risco de hipertensão grave — PAS ≥ 160 mmHg ou PAD ≥ 110 mmHg —, considerada emergência médica.\n\nSinais de alerta cardiovasculares no pós-parto incluem: dispneia em repouso, dor torácica, ortopneia, FC ≥ 120 bpm, PAS ≥ 160 mmHg ou < 90 mmHg, PAD ≥ 110 mmHg, sopro diastólico, B3 ou B4, sibilos ou crepitações pulmonares e turgência jugular.\n\nPacientes com maior risco de complicações cardiovasculares — hipertensão pulmonar, disfunção ventricular significativa, cardiopatias congênitas complexas e valvopatias obstrutivas graves — podem necessitar monitorização intensiva em UTI por pelo menos 24 a 72 horas após o parto.\n\nO manejo da anticoagulação no pós-parto requer equilíbrio entre risco tromboembólico e hemorrágico. O estado hipercoagulável da gestação persiste por várias semanas após o parto, especialmente nas primeiras 6 semanas. A varfarina é compatível com lactação; os anticoagulantes orais diretos geralmente não são recomendados para lactantes.\n\nDistúrbios hipertensivos da gestação devem ser encarados como o primeiro evento cardiovascular da paciente. A diretriz recomenda considerar limiar terapêutico de ≥ 130/80 mmHg para início ou intensificação do tratamento anti-hipertensivo no pós-parto. Anti-hipertensivos preferidos durante lactação: nifedipina, anlodipina, labetalol, enalapril e captopril.\n\nA gestação fornece informações prognósticas únicas sobre saúde cardiovascular futura. Desfechos adversos como pré-eclâmpsia, diabetes gestacional e parto prematuro associam-se a aumento significativo do risco futuro de hipertensão crônica, doença arterial coronariana, insuficiência cardíaca e AVC. O histórico obstétrico deve integrar a estratificação de risco cardiovascular ao longo de toda a vida da paciente.\n\nA otimização do cuidado cardiovascular pós-parto começa antes do nascimento e se estende ao longo do primeiro ano após o parto. Um modelo de cuidado colaborativo, multidisciplinar e centrado na paciente é essencial para redução da morbidade e mortalidade maternas e promoção da saúde cardiovascular ao longo da vida.",
    saves:52, likes:67,
    refs:[{label:"Lindley K et al. Optimization of Postpartum Care for Patients With and at Risk for Premature and Long-Term Cardiovascular Disease: 2026 ACC Expert Consensus Decision Pathway. JACC. 2026.", url:"https://doi.org/10.1016/j.jacc.2025.11.001"}] },
  { type:"recommended", specialty:"", author:"", time:"", saves:0, likes:0 },
];
EXTRA_CONTENT.forEach(c => { const col=getSpecialtyColor(c.specialty); c.bg=col.grad; c.accent=col.base; c.bgBase=col.base; });

const RECOMMENDED_FULL = [
  { type:"article", specialty:"Endocrinologia", author:"Erik Trovão", time:"27 mai 2026", duration:3,
    title:"Alterações metabólicas da SOMP: como influenciou a mudança de nome da síndrome",
    saves:27, likes:35,
    body:"A recente proposta internacional publicada no The Lancet para mudar o nome da síndrome dos ovários policísticos para síndrome ovariana metabólica poliendócrina (SOMP) tem como uma de suas principais justificativas a importância de enfatizar a característica multissistêmica da síndrome, incluindo as alterações metabólicas e o aumento do risco cardiovascular envolvidos. Desta forma, a SOMP deve ser entendida não apenas como um distúrbio reprodutivo, mas também como uma doença metabólica sistêmica. Alterações metabólicas como resistência à insulina, hiperinsulinemia, obesidade, dislipidemia e doença hepática esteatótica associada à disfunção metabólica (MASLD) estão presentes desde fases precoces da vida e exercem importante impacto sobre morbidade cardiovascular e metabólica de longo prazo.\n\nA fisiopatologia da SOMP é resultado da interação complexa entre fatores genéticos, epigenéticos, ambientais e neuroendócrinos. Alterações na pulsatilidade do GnRH promovem aumento relativo da secreção de LH em relação ao FSH, favorecendo hiperandrogenismo ovariano e disfunção ovulatória. Paralelamente, a resistência à insulina ocupa posição central no modelo fisiopatológico da doença, sendo observada inclusive em mulheres magras. A hiperinsulinemia compensatória estimula diretamente a esteroidogênese ovariana, reduz a síntese hepática de SHBG e amplifica a produção adrenal de andrógenos, perpetuando o hiperandrogenismo e agravando a disfunção metabólica.\n\nO tecido adiposo também desempenha papel fundamental na fisiopatologia da SOMP. Mais do que alterações na distribuição de gordura corporal, há evidências consistentes de disfunção adipocitária intrínseca, caracterizada por hipertrofia dos adipócitos, lipólise desregulada, infiltração inflamatória e secreção alterada de adipocinas. Essas alterações favorecem inflamação crônica, estresse oxidativo e resistência à insulina sistêmica. O hiperandrogenismo contribui adicionalmente para esse processo ao promover piora da adipogênese, aumento do acúmulo lipídico ectópico e redução da sensibilidade insulínica em músculo esquelético e fígado.\n\nOs fenótipos clínicos da SOMP apresentam heterogeneidade importante. Os fenótipos clássicos hiperandrogênicos, particularmente os definidos pelos critérios do NIH, associam-se a maior prevalência de obesidade, resistência à insulina, hipertrigliceridemia, redução de HDL-colesterol e síndrome metabólica. Já o fenótipo normoandrogênico tende a apresentar perfil cardiometabólico mais favorável. Ainda assim, mesmo mulheres magras e sem hiperandrogenismo podem apresentar alterações metabólicas sutis.\n\nDo ponto de vista genético, múltiplos loci relacionados à secreção gonadotrófica, biossíntese androgênica, desenvolvimento folicular e regulação metabólica já foram identificados em estudos de associação genômica. Além disso, evidências crescentes sugerem influência epigenética e programação fetal na origem da síndrome. Filhas de mulheres com SOMP apresentam risco significativamente maior de desenvolver a doença, enquanto filhos do sexo masculino demonstram maior prevalência de obesidade, dislipidemia e resistência à insulina, sustentando a hipótese de um possível equivalente masculino da SOP.\n\nDesta forma, o olhar sobre as mulheres com SOMP deve ir além da questão reprodutiva e incluir as alterações multissistêmicas que elas podem apresentar, incluindo a maior prevalência de intolerância à glicose, diabetes mellitus tipo 2, diabetes gestacional, dislipidemia, síndrome metabólica, MASLD e aumento do risco cardiovascular.",
    refs:[{label:"Proposição internacional para renomeação da SOP para SOMP. The Lancet, 2024.", url:"https://portal.afya.com.br/endocrinologia/alteracoes-metabolicas-da-somp-como-influenciou-a-mudanca-de-nome-da-sindrome"}] },
  { type:"article", specialty:"Cardiologia", author:"Juliana Avelar", time:"29 mai 2026", duration:7,
    title:"Otimização da pressão arterial após AVC: novas fronteiras",
    saves:48, likes:62,
    body:"A hipertensão arterial (HAS) é o principal fator de risco modificável para prevenção de eventos cardiovasculares em pessoas que já tiveram AVC ou ataque isquêmico transitório (AIT). Entretanto, apenas aproximadamente um em cada três pacientes pós-AVC apresenta controle adequado da pressão arterial, o que destaca a necessidade de mudança dos modelos convencionais de cuidado. Novas prioridades incluem adoção mais ampla de terapia anti-hipertensiva combinada para manter a pressão arterial sistólica abaixo de 130 mmHg, com ênfase em regimes simplificados e combinações em comprimido único.\n\nEmbora ensaios clínicos tenham estabelecido claramente os benefícios de longo prazo do controle efetivo da pressão arterial para prevenção secundária do AVC, a lacuna de implementação para traduzir essas evidências para a prática clínica continua ampla. Apesar de a maioria dos pacientes receber terapia anti-hipertensiva antes da alta hospitalar após um AVC, o cuidado pós-alta é fragmentado e inadequado para permitir o alcance das metas pressóricas recomendadas.\n\nEstudos epidemiológicos confirmaram uma relação linear entre pressão arterial e risco cardiovascular a partir de valores de pressão sistólica tão baixos quanto 110 mmHg em todas as idades, sexos e grupos étnicos, de forma que uma redução de 10 mmHg na pressão arterial sistólica pode se traduzir em redução de até um terço no risco de AVC recorrente e redução de 10–20% no risco de qualquer evento cardiovascular grave.\n\nEstudos em animais demonstram que a parede arterial degenera pela exposição à hipertensão arterial, com alterações endoteliais e permeabilidade alterada da barreira hematoencefálica. O dano vascular endotelial está associado à liberação de endotelina, radicais livres e citocinas. O AVC isquêmico corresponde a aproximadamente 85% dos AVCs no mundo e resulta de lesão arterial levando à aterosclerose e aterotrombose. A hipertensão também pode causar doença de pequenos vasos por estresse mecânico, predispondo a infartos lacunares e micro-hemorragias.\n\nAs evidências são claras de que a terapia anti-hipertensiva melhora desfechos cardiovasculares em pacientes com história de AVC. O Chinese Post-Stroke Antihypertensive Study demonstrou que reduções modestas de 5/2 mmHg através do uso de indapamida reduziram o risco de AVC recorrente em 29% comparado ao placebo. O estudo HOPE demonstrou que o IECA ramipril reduziu o risco de AVC recorrente em quase 25%.\n\nOs dados mais influentes são provenientes do estudo PROGRESS, no qual 6105 pacientes com AVC ou AIT prévios foram randomizados para tratamento com perindopril e indapamida ou placebo. Houve redução de 28% no risco de AVC recorrente no grupo tratamento. A terapia combinada produziu reduções ainda maiores — redução pressórica de 12/5 mmHg e redução de 43% no risco relativo de AVC. Notavelmente, a incidência de AVC também foi reduzida em participantes com pressão arterial basal média de 136/79 mmHg, considerados não hipertensos.\n\nAs diretrizes da European Stroke Organisation recomendam terapia anti-hipertensiva combinada para prevenção secundária. A diretriz AHA/ASA de 2021 recomenda IECA, BRA ou diurético tiazídico-like. Metanálises em rede classificam a combinação de IECA e diurético como estratégia preferencial. A meta para pacientes com AVC prévio deve ser pressão arterial sistólica inferior a 130 mmHg.\n\nEvidências crescentes sugerem que estratégias inovadoras e centradas no paciente são cruciais para melhorar o controle pressórico pós-AVC. Monoterapia em dose padrão reduz PAS em média 8,7 mmHg, enquanto combinações duplas promovem redução média de 14,9 mmHg. As diretrizes norte-americanas apoiam início de terapia anti-hipertensiva dupla, preferencialmente como combinação em comprimido único.\n\nNovas terapias anti-hipertensivas oferecem potencial para enfrentar inércia terapêutica e baixa adesão. Terapias com RNA de interferência direcionadas à produção hepática de angiotensinogênio promovem redução prolongada com doses infrequentes. Estudos com zilebesiran mostraram reduções significativas e sustentadas com administração semestral. Inibidores da aldosterona sintase representam nova classe promissora para hipertensão resistente.\n\nOs autores destacam que metas pressóricas ideais ainda precisam ser esclarecidas em grupos de alto risco. PAS < 130 mmHg deve ser considerada alvo padrão para a maioria dos pacientes pós-AVC. Terapia combinada precoce deve ser amplamente utilizada. Combinações em comprimido único provavelmente representam o futuro do tratamento. Telemonitorização e automonitorização devem ser incorporadas ao cuidado longitudinal.",
    refs:[{label:"Avelar J. Blood pressure optimisation after stroke: new frontiers. Lancet Neurology, 2026.", url:"https://portal.afya.com.br/cardiologia/otimizacao-da-pressao-arterial-apos-avc-novas-fronteiras-2"}] },
  { type:"article", specialty:"Clínica Médica", author:"Leandro Lima", time:"15 mai 2026", duration:4,
    title:"Helicobacter pylori: ACG atualiza tratamento e resgate",
    saves:31, likes:44,
    body:"A infecção pelo Helicobacter pylori, bactéria gram-negativa, é um dos principais fatores de risco para gastrite crônica, úlcera péptica e adenocarcinoma gástrico. Em 2024, o American College of Gastroenterology (ACG) publicou uma atualização de suas diretrizes terapêuticas, considerando o impacto crescente da resistência antimicrobiana, especialmente à claritromicina e ao levofloxacino, além de novas opções terapêuticas, como os bloqueadores competitivos do potássio (PCABs).\n\nNas novas diretrizes do ACG, a terapia quádrupla foi consolidada como primeira linha para pacientes virgens de tratamento. O esquema inclui inibidor de bomba protônica (IBP) em dose padrão duas vezes ao dia, bismuto, tetraciclina e metronidazol.\n\nA recomendação foi embasada por uma metanálise em rede com mais de 20 mil pacientes, que demonstrou superioridade desse esquema em relação ao esquema triplo clássico, composto por IBP, amoxicilina e claritromicina. As taxas de erradicação foram de 81,3% e 75,7%, respectivamente.\n\nEntre as alternativas emergentes, a vonoprazana ganhou destaque. O PCAB apresenta supressão ácida mais potente e rápida que os IBPs tradicionais, favorecendo a ação antibiótica. Assim, a terapia dupla com vonoprazana e amoxicilina, ou a terapia tripla com vonoprazana, amoxicilina e claritromicina, despontam como opções — especialmente diante da indisponibilidade do bismuto —, com taxas de erradicação próximas a 80%.\n\nOutro ponto importante é o manejo da falha terapêutica. As diretrizes enfatizam que o esquema de resgate deve ser guiado pelo tratamento prévio. Quando há falha com a terapia tripla baseada em IBP, a indicação é utilizar terapia contendo bismuto. Quando há falha com terapia contendo bismuto, a recomendação é empregar terapia tripla com rifabutina, com melhor perfil de tolerância e maior adesão.\n\nAs diretrizes reforçam a importância da confirmação de erradicação pelo menos 4 semanas após o término do tratamento. Os métodos preferenciais são o teste respiratório de ureia ou a pesquisa de antígeno fecal, por serem menos invasivos que a repetição da endoscopia digestiva alta com biópsias.\n\nNão há uma sugestão específica de IBP para a erradicação do H. pylori, embora esomeprazol e rabeprazol, assim como os PCABs, não estejam sujeitos aos genótipos de metabolizadores ultrarrápidos do CYP2C19.\n\nA terapia quádrupla com bismuto por 14 dias consolidou-se como primeira opção terapêutica. Esquemas empíricos com claritromicina perderam espaço devido à resistência antimicrobiana crescente. A vonoprazana desponta como alternativa em cenários selecionados. O tratamento de resgate deve considerar a exposição antibiótica prévia. No Brasil, conforme prévia do novo Consenso Brasileiro apresentada na SBAD 2025, a tendência é acompanhar as recomendações norte-americanas.",
    refs:[{label:"ACG Clinical Guideline: Treatment of Helicobacter Pylori Infection. Am J Gastroenterol. 2024.", url:"https://portal.afya.com.br/clinica-medica/helicobacter-pylori-acg-atualiza-tratamento-e-resgate"}] },
];
RECOMMENDED_FULL.forEach(c => { const col=getSpecialtyColor(c.specialty); c.bg=col.grad; c.accent=col.base; c.bgBase=col.base; });

const H = 852;

const AuthorMeta = ({ item, onAuthorTap }) => (
  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10}}>
    <div onClick={e=>{e.stopPropagation();onAuthorTap&&onAuthorTap();}}
      style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <Avatar name={item.author} size={26}/>
      <span style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.6)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:180}}>{item.author}</span>
    </div>
    {item.duration && <>
      <span style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>·</span>
      <span className="material-symbols-rounded" style={{fontSize:13,color:"rgba(255,255,255,0.45)",fontVariationSettings:"'FILL' 0,'wght' 300"}}>schedule</span>
      <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600}}>{item.duration} {item.durationUnit || "min"}</span>
    </>}
  </div>
);

const VideoCard = ({ item, onAuthorTap, onRefsTap, active, isMuted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const fbTimer = useRef(null);
  const videoRef = useRef(null);
  const seekBarRef = useRef(null);
  const wasPlayingRef = useRef(false);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.muted = isMuted;
      v.play().catch(() => {});
      setIsPlaying(true);
      setProgress(0);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = isMuted;
  }, [isMuted]);

  useEffect(() => () => clearTimeout(fbTimer.current), []);

  const formatTime = (s) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

  const handleSeekDown = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    wasPlayingRef.current = isPlaying;
    isSeekingRef.current = true;
    v.pause();
    setIsSeeking(true);

    const applySeek = (clientX) => {
      const bar = seekBarRef.current;
      if (!bar || !v.duration) return;
      const r = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      const t = ratio * v.duration;
      setProgress(ratio);
      setSeekTime(t);
      v.currentTime = t;
    };

    applySeek(e.clientX);

    const onMove = (ev) => applySeek(ev.clientX);
    const onUp = () => {
      isSeekingRef.current = false;
      setIsSeeking(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (wasPlayingRef.current) v.play().catch(() => {});
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const handleTap = () => {
    if (isSeeking) return;
    const v = videoRef.current;
    if (!v) return;
    const next = !isPlaying;
    next ? v.play().catch(() => {}) : v.pause();
    setIsPlaying(next);
    clearTimeout(fbTimer.current);
    setFeedback({ icon: next ? "play_arrow" : "pause", key: Date.now() });
    fbTimer.current = setTimeout(() => setFeedback(null), 1000);
  };

  return (
    <div onClick={handleTap} style={{position:"relative",width:"100%",height:"100%",background:item.bg,cursor:"pointer"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:260,background:"linear-gradient(to bottom,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.4) 55%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:320,background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.45) 55%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
      {item.videoSrc ? (
        <video
          ref={videoRef}
          src={item.videoSrc}
          muted loop playsInline
          onTimeUpdate={() => {
            const v = videoRef.current;
            if (!v || isSeekingRef.current || !v.duration) return;
            setProgress(v.currentTime / v.duration);
          }}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
            filter:isSeeking?"blur(3px)":"none",transition:isSeeking?"none":"filter .25s"}}
        />
      ) : item.youtubeId ? (
        <iframe
          title="video"
          src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
          style={{position:"absolute",top:"50%",left:"50%",width:"200%",height:"200%",transform:"translate(-50%,-50%)",border:"none",pointerEvents:"none"}}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(12px)",border:"2px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span className="material-symbols-rounded" style={{fontSize:34,color:"white",marginLeft:4}}>play_arrow</span>
          </div>
        </div>
      )}
      {feedback && (
        <div key={feedback.key} style={{position:"absolute",inset:0,zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(14px)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",animation:"feedbackFade 1s ease forwards"}}>
            <span className="material-symbols-rounded" style={{fontSize:40,color:"white",marginLeft:feedback.icon==="play_arrow"?4:0,fontVariationSettings:"'FILL' 1,'wght' 400"}}>{feedback.icon}</span>
          </div>
        </div>
      )}
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:112,left:18,right:64,zIndex:3}}>
        {item.refs && <button onClick={e=>{e.stopPropagation();onRefsTap&&onRefsTap();}} style={{display:"inline-flex",alignItems:"center",gap:4,marginBottom:10,background:"none",border:"none",padding:0,cursor:"pointer",color:"rgba(255,255,255,0.55)",fontSize:11,fontWeight:600}}>
          <span className="material-symbols-rounded" style={{fontSize:14,fontVariationSettings:"'FILL' 0,'wght' 300"}}>menu_book</span>Referências
        </button>}
        <h2 style={{color:"white",fontSize:20,fontWeight:700,lineHeight:1.35,margin:0,textShadow:"0 2px 12px rgba(0,0,0,0.7)"}}>{item.title}</h2>
        <AuthorMeta item={item} onAuthorTap={onAuthorTap}/>
      </div>

      {item.videoSrc && (
        <div
          ref={seekBarRef}
          onPointerDown={handleSeekDown}
          onClick={e => e.stopPropagation()}
          style={{position:"absolute",bottom:80,left:18,right:18,zIndex:25,
            padding:"10px 0",cursor:"pointer",touchAction:"none"}}
        >
          {isSeeking && (
            <div style={{
              position:"absolute",
              bottom:"100%",
              left:`clamp(24px, calc(${progress*100}% ), calc(100% - 24px))`,
              transform:"translateX(-50%)",
              marginBottom:10,
              background:"rgba(10,10,10,0.82)",
              backdropFilter:"blur(8px)",
              color:"white",fontSize:13,fontWeight:700,
              padding:"5px 10px",borderRadius:8,
              pointerEvents:"none",whiteSpace:"nowrap",
              border:"1px solid rgba(255,255,255,0.15)",
              boxShadow:"0 4px 12px rgba(0,0,0,0.4)"
            }}>
              {formatTime(seekTime)}
            </div>
          )}
          <div style={{position:"relative",width:"100%",height:isSeeking?5:3,
            background:"rgba(255,255,255,0.28)",transition:"height .15s",borderRadius:4}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,
              width:`${progress*100}%`,
              background:"linear-gradient(to right,#CD1C61,#3A439C)",
              borderRadius:4}}/>
            <div style={{
              position:"absolute",
              left:`${progress*100}%`,
              top:"50%",
              transform:"translate(-50%,-50%)",
              width:isSeeking?16:12,height:isSeeking?16:12,
              borderRadius:"50%",background:"white",
              boxShadow:"0 2px 8px rgba(0,0,0,0.5)",
              border:"2px solid #CD1C61",
              transition:isSeeking?"none":"width .15s,height .15s",
              pointerEvents:"none"
            }}/>
          </div>
        </div>
      )}
    </div>
  );
};

const ArticlePage = ({ item, onClose, onShare }) => {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setTimeout(onClose, 300); };
  const refList = item.refs ? (Array.isArray(item.refs) ? item.refs : [{ label: item.refs, url: item.refs }]) : [];
  const accentColor = item.accent || "#2261B1";

  return (
    <div style={{position:"absolute",inset:0,zIndex:60,background:"white",
      transform:visible?"translateX(0)":"translateX(100%)",
      transition:"transform .3s cubic-bezier(.32,1,.4,1)",
      display:"flex",flexDirection:"column",overflow:"hidden"}}>

      {/* Header fixo branco */}
      <div style={{flexShrink:0,display:"flex",alignItems:"center",
        padding:"52px 16px 12px",background:"white",
        borderBottom:"1px solid rgba(0,0,0,0.07)"}}>
        <button onClick={close} style={{width:36,height:36,borderRadius:"50%",
          background:"rgba(0,0,0,0.06)",border:"none",
          cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span className="material-symbols-rounded" style={{fontSize:22,color:"#222"}}>arrow_back</span>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
        <div style={{padding:"20px 20px 0"}}>

          {/* Title */}
          <h1 style={{color:"#0d0d0d",fontSize:22,fontWeight:800,lineHeight:1.32,
            margin:"0 0 14px",letterSpacing:-0.4}}>{item.title}</h1>

          {/* Meta row */}
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:18,flexWrap:"wrap"}}>
            <span style={{background:`${accentColor}18`,color:accentColor,
              borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,
              border:`1px solid ${accentColor}28`}}>{item.specialty}</span>
            <span style={{color:"rgba(0,0,0,0.3)",fontSize:12}}>•</span>
            <span style={{color:"rgba(0,0,0,0.45)",fontSize:12,fontWeight:500}}>
              Publicado {item.time}
            </span>
            {item.duration && <>
              <span style={{color:"rgba(0,0,0,0.3)",fontSize:12}}>•</span>
              <span style={{color:"rgba(0,0,0,0.45)",fontSize:12,fontWeight:500}}>{item.duration} min de leitura</span>
            </>}
          </div>

          {/* Author row */}
          <div style={{display:"flex",alignItems:"center",gap:12,
            paddingBottom:20,borderBottom:"1px solid rgba(0,0,0,0.07)"}}>
            <Avatar name={item.author} size={42}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700,color:"#111",lineHeight:1.2,
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.author}</div>
              <div style={{fontSize:12,color:"rgba(0,0,0,0.4)",marginTop:3}}>{item.specialty}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{padding:"20px 20px 24px"}}>
          {item.body.split("\n\n").map((p,i,arr)=>(
            <p key={i} style={{color:"rgba(0,0,0,0.76)",fontSize:15.5,lineHeight:1.88,
              margin:i<arr.length-1?"0 0 20px":0,fontWeight:400}}>{p}</p>
          ))}
        </div>

        {/* References */}
        {refList.length > 0 && (
          <div style={{margin:"0 20px 24px",paddingTop:20,borderTop:"1px solid rgba(0,0,0,0.07)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#111",marginBottom:14,
              display:"flex",alignItems:"center",gap:6}}>
              <span className="material-symbols-rounded" style={{fontSize:16,
                fontVariationSettings:"'FILL' 0,'wght' 400"}}>menu_book</span>
              Referências bibliográficas
            </div>
            {refList.map((ref,i)=>(
              <a key={i} href={ref.url} target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"flex-start",gap:10,textDecoration:"none",
                  padding:"10px 0",borderBottom:i<refList.length-1?"1px solid rgba(0,0,0,0.06)":"none"}}>
                <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",
                  width:22,height:22,borderRadius:"50%",background:`${accentColor}15`,
                  fontSize:10,fontWeight:800,color:accentColor,flexShrink:0,marginTop:1}}>
                  {i+1}
                </span>
                <span style={{color:"#2261B1",fontSize:12.5,fontWeight:500,
                  lineHeight:1.55,wordBreak:"break-all"}}>
                  {ref.label !== ref.url ? ref.label : ref.url}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div style={{flexShrink:0,background:"white",borderTop:"1px solid rgba(0,0,0,0.07)",
        padding:"10px 20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setLiked(l=>!l)} style={{display:"flex",alignItems:"center",gap:6,
            background:liked?"rgba(233,69,96,0.08)":"rgba(0,0,0,0.04)",
            border:`1px solid ${liked?"rgba(233,69,96,0.25)":"rgba(0,0,0,0.09)"}`,
            borderRadius:24,padding:"9px 18px",cursor:"pointer",color:liked?"#e94560":"#555",transition:"all .2s"}}>
            <span className="material-symbols-rounded" style={{fontSize:18,
              fontVariationSettings:liked?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300"}}>favorite</span>
            <span style={{fontSize:13,fontWeight:700}}>{(item.likes||0)+(liked?1:0)}</span>
          </button>
          <button onClick={()=>setSaved(s=>!s)} style={{display:"flex",alignItems:"center",gap:6,
            background:saved?`${accentColor}0f`:"rgba(0,0,0,0.04)",
            border:`1px solid ${saved?`${accentColor}35`:"rgba(0,0,0,0.09)"}`,
            borderRadius:24,padding:"9px 18px",cursor:"pointer",color:saved?accentColor:"#555",transition:"all .2s"}}>
            <span className="material-symbols-rounded" style={{fontSize:18,
              fontVariationSettings:saved?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300"}}>bookmark</span>
            <span style={{fontSize:13,fontWeight:700}}>{(item.saves||0)+(saved?1:0)}</span>
          </button>
        </div>
        <button onClick={onShare} style={{display:"flex",alignItems:"center",gap:6,
          background:"rgba(0,0,0,0.04)",border:"1px solid rgba(0,0,0,0.09)",
          borderRadius:24,padding:"9px 18px",cursor:"pointer",color:"#555"}}>
          <span className="material-symbols-rounded" style={{fontSize:18,
            fontVariationSettings:"'FILL' 0,'wght' 300"}}>share</span>
          <span style={{fontSize:13,fontWeight:700}}>Compartilhar</span>
        </button>
      </div>
    </div>
  );
};

const ArticleCard = ({ item, onAuthorTap, onArticleTap }) => (
  <div style={{position:"relative",width:"100%",height:"100%",background:item.bg,display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 64px 100px 18px"}}>
    <h2 style={{color:"white",fontSize:21,fontWeight:700,lineHeight:1.3,marginBottom:12,textShadow:"0 2px 16px rgba(0,0,0,0.5)"}}>{item.title}</h2>
    <AuthorMeta item={item} onAuthorTap={onAuthorTap}/>
    <p style={{color:"rgba(255,255,255,0.75)",fontSize:14,lineHeight:1.75,margin:"16px 0 0",display:"-webkit-box",WebkitLineClamp:10,WebkitBoxOrient:"vertical",overflow:"hidden",textShadow:"0 1px 6px rgba(0,0,0,0.4)"}}>{item.body.split("\n\n")[0]}</p>
    <button onClick={()=>onArticleTap&&onArticleTap(item)} style={{marginTop:18,alignSelf:"flex-start",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:28,color:"white",fontSize:12,fontWeight:700,height:56,padding:"0 24px",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
      Ler artigo completo →
    </button>
  </div>
);

const QUIZ_LETTERS = ["A","B","C","D"];

const QuizPage = ({ item, onClose, onShare }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setTimeout(onClose, 300); };
  const reset = () => { setSelected(null); setSubmitted(false); };
  const accentColor = item.accent || "#2261B1";
  const refList = item.refs ? (Array.isArray(item.refs) ? item.refs : [{ label: item.refs, url: item.refs }]) : [];
  const isCorrect = submitted && selected === item.correct;

  const optionStyle = (i) => {
    if (!submitted) {
      return selected === i
        ? { bg:"white", border:"#111", badgeBg:"#111", badgeColor:"white", label:null, labelColor:null }
        : { bg:"#f7f7f7", border:"rgba(0,0,0,0.08)", badgeBg:"#e0e0e0", badgeColor:"#555", label:null, labelColor:null };
    }
    if (i === item.correct)
      return { bg:"#f1faf2", border:"#81c784", badgeBg:"#2e7d32", badgeColor:"white",
        label: i === selected ? "Correta • Selecionada" : "Correta", labelColor:"#2e7d32" };
    if (i === selected)
      return { bg:"#fdf1f1", border:"#e57373", badgeBg:"#c62828", badgeColor:"white",
        label:"Incorreta • Selecionada", labelColor:"#c62828" };
    return { bg:"#f7f7f7", border:"rgba(0,0,0,0.08)", badgeBg:"#e0e0e0", badgeColor:"#aaa",
      label:"Incorreta", labelColor:"#999" };
  };

  return (
    <div style={{position:"absolute",inset:0,zIndex:60,background:"white",
      transform:visible?"translateX(0)":"translateX(100%)",
      transition:"transform .3s cubic-bezier(.32,1,.4,1)",
      display:"flex",flexDirection:"column",overflow:"hidden"}}>

      <div style={{flexShrink:0,display:"flex",alignItems:"center",
        padding:"52px 16px 12px",background:"white",borderBottom:"1px solid rgba(0,0,0,0.07)"}}>
        <button onClick={close} style={{width:36,height:36,borderRadius:"50%",background:"rgba(0,0,0,0.06)",
          border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span className="material-symbols-rounded" style={{fontSize:22,color:"#222"}}>arrow_back</span>
        </button>
      </div>

      <div style={{flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>

        {/* Header info */}
        <div style={{padding:"20px 20px 0"}}>
          <h1 style={{color:"#0d0d0d",fontSize:22,fontWeight:800,lineHeight:1.32,
            margin:"0 0 14px",letterSpacing:-0.4}}>
            {item.title || item.q}
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:18,flexWrap:"wrap"}}>
            <span style={{background:`${accentColor}18`,color:accentColor,borderRadius:20,
              padding:"3px 10px",fontSize:11,fontWeight:700,border:`1px solid ${accentColor}28`}}>
              {item.specialty}
            </span>
            <span style={{color:"rgba(0,0,0,0.3)",fontSize:12}}>•</span>
            <span style={{color:"rgba(0,0,0,0.45)",fontSize:12,fontWeight:500}}>
              Publicado {item.time}
            </span>
            {item.duration && <>
              <span style={{color:"rgba(0,0,0,0.3)",fontSize:12}}>•</span>
              <span style={{color:"rgba(0,0,0,0.45)",fontSize:12,fontWeight:500}}>{item.duration} min de leitura</span>
            </>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12,
            paddingBottom:20,borderBottom:"1px solid rgba(0,0,0,0.07)"}}>
            <Avatar name={item.author} size={42}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700,color:"#111",lineHeight:1.2,
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.author}</div>
              <div style={{fontSize:12,color:"rgba(0,0,0,0.4)",marginTop:3}}>{item.specialty}</div>
            </div>
          </div>
          {item.intro && (
            <p style={{color:"rgba(0,0,0,0.72)",fontSize:14.5,lineHeight:1.78,
              margin:"20px 0 0"}}>{item.intro}</p>
          )}
        </div>

        {/* Case image */}
        {item.img && (
          <div style={{margin:"20px 20px 0",borderRadius:16,overflow:"hidden",
            border:"1px solid rgba(0,0,0,0.07)"}}>
            <img src={item.img} alt="Imagem do caso clínico"
              style={{width:"100%",display:"block",objectFit:"cover"}}/>
            <div style={{padding:"8px 12px",background:"#f7f7f7",
              fontSize:11,color:"rgba(0,0,0,0.45)",fontStyle:"italic"}}>
              Figura 1. Lesão azulada — visão macroscópica e dermatoscópica
            </div>
          </div>
        )}

        {/* Question */}
        <div style={{padding:"20px 20px 0"}}>
          <p style={{color:"#0d0d0d",fontSize:16,fontWeight:800,lineHeight:1.45,
            margin:0,letterSpacing:-0.2,
            borderTop:item.intro||item.img?"1px solid rgba(0,0,0,0.07)":undefined,
            paddingTop:item.intro||item.img?16:0}}>
            {item.q}
          </p>
        </div>

        {/* Options */}
        <div style={{padding:"20px"}}>
          {item.opts.map((opt,i) => {
            const s = optionStyle(i);
            return (
              <button key={i} onClick={()=>{ if(!submitted) setSelected(i); }}
                style={{display:"flex",alignItems:"flex-start",gap:14,width:"100%",
                  background:s.bg,border:`1.5px solid ${s.border}`,borderRadius:16,
                  padding:"16px",marginBottom:i<item.opts.length-1?10:0,
                  cursor:submitted?"default":"pointer",textAlign:"left",transition:"all .2s"}}>
                <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",
                  width:32,height:32,borderRadius:"50%",background:s.badgeBg,
                  color:s.badgeColor,fontSize:13,fontWeight:800,flexShrink:0}}>
                  {QUIZ_LETTERS[i]}
                </span>
                <div style={{flex:1,minWidth:0,paddingTop:4}}>
                  {s.label && (
                    <div style={{fontSize:11,fontWeight:700,color:s.labelColor,marginBottom:5}}>
                      {s.label}
                    </div>
                  )}
                  <div style={{fontSize:14,fontWeight:600,color:"#111",lineHeight:1.4}}>{opt}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit / Refazer */}
        <div style={{padding:"0 20px 20px"}}>
          {!submitted ? (
            <button onClick={()=>{ if(selected!==null) setSubmitted(true); }}
              style={{width:"100%",height:52,borderRadius:26,
                background:selected!==null?"#111":"rgba(0,0,0,0.08)",border:"none",
                color:selected!==null?"white":"rgba(0,0,0,0.3)",fontSize:15,fontWeight:700,
                cursor:selected!==null?"pointer":"default",transition:"all .2s"}}>
              Enviar resposta
            </button>
          ) : (
            <button onClick={reset}
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                background:"none",border:"1.5px solid rgba(0,0,0,0.15)",borderRadius:26,
                padding:"14px 24px",fontSize:14,fontWeight:700,color:"#333",cursor:"pointer"}}>
              <span className="material-symbols-rounded" style={{fontSize:18}}>refresh</span>
              Refazer quiz
            </button>
          )}
        </div>

        {/* Result banner */}
        {submitted && (
          <div style={{margin:"0 20px",padding:"40px 0",borderTop:"1px solid rgba(0,0,0,0.07)",display:"flex",alignItems:"flex-start",gap:14}}>
            <img src={isCorrect?"/party.svg":"/circle-close.svg"} alt=""
              style={{width:52,height:52,flexShrink:0,marginTop:2}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:800,color:"#0d0d0d",marginBottom:5,letterSpacing:-0.2}}>
                {isCorrect?"Excelente resultado!":"Continue praticando!"}
              </div>
              <div style={{fontSize:14,color:"rgba(0,0,0,0.55)",lineHeight:1.55}}>
                {isCorrect
                  ? "Você teve um ótimo desempenho e mostrou domínio do conteúdo."
                  : "Dessa vez você não acertou, mas cada Quiz é uma chance de aprender algo novo. Continue praticando e evoluindo!"}
              </div>
            </div>
          </div>
        )}

        {/* Inline comment after submit */}
        {submitted && item.comment && (
          <div style={{margin:"0 20px 20px",padding:18,
            background:"rgba(34,97,177,0.04)",borderRadius:16,
            borderLeft:"3px solid #2261B1"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#2261B1",marginBottom:12,
              display:"flex",alignItems:"center",gap:6}}>
              <span className="material-symbols-rounded" style={{fontSize:16,
                fontVariationSettings:"'FILL' 0,'wght' 400"}}>clinical_notes</span>
              Comentário da questão
            </div>
            {item.comment.split("\n\n").map((p,i,arr)=>(
              <p key={i} style={{color:"rgba(0,0,0,0.72)",fontSize:13.5,lineHeight:1.78,
                margin:i<arr.length-1?"0 0 12px":0}}>{p}</p>
            ))}
            {item.commentRef && (
              <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid rgba(34,97,177,0.12)"}}>
                <p style={{fontSize:12,color:"rgba(0,0,0,0.45)",lineHeight:1.6,margin:0,fontStyle:"italic"}}>
                  {item.commentRef}
                </p>
              </div>
            )}
          </div>
        )}

        {/* References */}
        {refList.length > 0 && (
          <div style={{margin:"0 20px 24px",paddingTop:16,borderTop:"1px solid rgba(0,0,0,0.07)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#111",marginBottom:14,
              display:"flex",alignItems:"center",gap:6}}>
              <span className="material-symbols-rounded" style={{fontSize:16,
                fontVariationSettings:"'FILL' 0,'wght' 400"}}>menu_book</span>
              Referências bibliográficas
            </div>
            {refList.map((ref,i)=>(
              <a key={i} href={ref.url} target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"flex-start",gap:10,textDecoration:"none",
                  padding:"10px 0",borderBottom:i<refList.length-1?"1px solid rgba(0,0,0,0.06)":"none"}}>
                <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",
                  width:22,height:22,borderRadius:"50%",background:`${accentColor}15`,
                  fontSize:10,fontWeight:800,color:accentColor,flexShrink:0,marginTop:1}}>
                  {i+1}
                </span>
                <span style={{color:"#2261B1",fontSize:12.5,fontWeight:500,
                  lineHeight:1.55,wordBreak:"break-all"}}>
                  {ref.label !== ref.url ? ref.label : ref.url}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div style={{flexShrink:0,background:"white",borderTop:"1px solid rgba(0,0,0,0.07)",
        padding:"10px 20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setLiked(l=>!l)} style={{display:"flex",alignItems:"center",gap:6,
            background:liked?"rgba(233,69,96,0.08)":"rgba(0,0,0,0.04)",
            border:`1px solid ${liked?"rgba(233,69,96,0.25)":"rgba(0,0,0,0.09)"}`,
            borderRadius:24,padding:"9px 18px",cursor:"pointer",color:liked?"#e94560":"#555",transition:"all .2s"}}>
            <span className="material-symbols-rounded" style={{fontSize:18,
              fontVariationSettings:liked?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300"}}>favorite</span>
            <span style={{fontSize:13,fontWeight:700}}>{(item.likes||0)+(liked?1:0)}</span>
          </button>
          <button onClick={()=>setSaved(s=>!s)} style={{display:"flex",alignItems:"center",gap:6,
            background:saved?`${accentColor}0f`:"rgba(0,0,0,0.04)",
            border:`1px solid ${saved?`${accentColor}35`:"rgba(0,0,0,0.09)"}`,
            borderRadius:24,padding:"9px 18px",cursor:"pointer",color:saved?accentColor:"#555",transition:"all .2s"}}>
            <span className="material-symbols-rounded" style={{fontSize:18,
              fontVariationSettings:saved?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300"}}>bookmark</span>
            <span style={{fontSize:13,fontWeight:700}}>{(item.saves||0)+(saved?1:0)}</span>
          </button>
        </div>
        <button onClick={onShare} style={{display:"flex",alignItems:"center",gap:6,
          background:"rgba(0,0,0,0.04)",border:"1px solid rgba(0,0,0,0.09)",
          borderRadius:24,padding:"9px 18px",cursor:"pointer",color:"#555"}}>
          <span className="material-symbols-rounded" style={{fontSize:18,
            fontVariationSettings:"'FILL' 0,'wght' 300"}}>share</span>
          <span style={{fontSize:13,fontWeight:700}}>Compartilhar</span>
        </button>
      </div>
    </div>
  );
};

const QuizCard = ({ item, onAuthorTap, onQuizTap }) => (
  <div style={{position:"relative",width:"100%",height:"100%",background:item.bg,
    display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 64px 100px 18px"}}>
    <span style={{alignSelf:"flex-start",background:"white",borderRadius:20,padding:"3px 10px",
      fontSize:11,fontWeight:800,color:"#111",marginBottom:10,letterSpacing:0.2}}>Quiz</span>
    <h2 style={{color:"white",fontSize:21,fontWeight:700,lineHeight:1.3,marginBottom:12,
      textShadow:"0 2px 16px rgba(0,0,0,0.5)"}}>{item.title || item.q}</h2>
    <AuthorMeta item={item} onAuthorTap={onAuthorTap}/>
    <p style={{color:"rgba(255,255,255,0.75)",fontSize:14,lineHeight:1.75,margin:"16px 0 0",
      display:"-webkit-box",WebkitLineClamp:6,WebkitBoxOrient:"vertical",overflow:"hidden",
      textShadow:"0 1px 6px rgba(0,0,0,0.4)"}}>
      {item.intro || item.q}
    </p>
    <button onClick={()=>onQuizTap&&onQuizTap(item)}
      style={{marginTop:18,alignSelf:"flex-start",background:"rgba(255,255,255,0.1)",
        backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:28,
        color:"white",fontSize:12,fontWeight:700,height:56,padding:"0 24px",cursor:"pointer",
        display:"flex",alignItems:"center",gap:6}}>
      Teste seu conhecimento →
    </button>
  </div>
);

const EndOfFeedCard = ({ onHistoryTap }) => (
  <div style={{width:"100%",height:"100%",background:"linear-gradient(160deg,#0f2952 0%,#1a4080 45%,#2261B1 100%)",
    display:"flex",flexDirection:"column",boxSizing:"border-box"}}>
    {/* Centro: ícone + título + texto */}
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:"80px 32px 0"}}>
      <span className="material-symbols-rounded" style={{fontSize:52,color:"rgba(255,255,255,0.22)",marginBottom:22,
        fontVariationSettings:"'FILL' 1,'wght' 400"}}>check_circle</span>
      <h2 style={{color:"white",fontSize:26,fontWeight:800,textAlign:"center",margin:"0 0 12px",
        letterSpacing:-0.5,lineHeight:1.25}}>
        Por hoje é só!
      </h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:15,textAlign:"center",lineHeight:1.65,margin:0}}>
        Estes foram os conteúdos selecionados para você no dia de hoje.
      </p>
    </div>
    {/* Bottom: card âncora acima do BottomBar */}
    <div style={{padding:"0 24px 120px"}}>
      <button onClick={onHistoryTap} style={{width:"100%",background:"rgba(255,255,255,0.08)",
        border:"1px solid rgba(255,255,255,0.14)",borderRadius:20,padding:"20px 22px",
        textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",
        justifyContent:"space-between",gap:12,backdropFilter:"blur(12px)"}}>
        <div>
          <div style={{color:"white",fontSize:16,fontWeight:700,marginBottom:5,lineHeight:1.3}}>
            O que aconteceu nos últimos dias
          </div>
          <div style={{color:"rgba(255,255,255,0.45)",fontSize:14,lineHeight:1.55}}>
            Continue rolando para ver os conteúdos mais relevantes dos últimos dias.
          </div>
        </div>
        <span className="material-symbols-rounded" style={{fontSize:24,color:"rgba(255,255,255,0.4)",flexShrink:0}}>
          arrow_downward
        </span>
      </button>
    </div>
  </div>
);

const RECOMMENDED_ARTICLES = [
  { title:"Alterações metabólicas da SOMP: como influenciou a mudança de nome da síndrome", time:"27 mai 2026 · 3 min", img:"/somp.jpg", article:RECOMMENDED_FULL[0] },
  { title:"Otimização da pressão arterial após AVC: novas fronteiras", time:"29 mai 2026 · 7 min", img:"/avc-pa.jpg", article:RECOMMENDED_FULL[1] },
  { title:"Helicobacter pylori: ACG atualiza tratamento e resgate", time:"15 mai 2026 · 4 min", img:"/h-pylori.jpg", article:RECOMMENDED_FULL[2] },
];

const RecommendedCard = ({ onArticleTap }) => (
  <div style={{width:"100%",height:"100%",background:"#2C2B30",display:"flex",flexDirection:"column",
    justifyContent:"center",padding:"0 24px",boxSizing:"border-box",overflowY:"auto"}}>
    <div style={{paddingBottom:28}}>
      <h2 style={{color:"#ffffff",fontSize:18,fontWeight:800,lineHeight:1.2,letterSpacing:-0.2,margin:0}}>
        Você também pode se interessar
      </h2>
    </div>
    {RECOMMENDED_ARTICLES.map((a, i) => (
      <div key={i} onClick={()=>onArticleTap&&onArticleTap(a.article)}
        style={{display:"flex",alignItems:"center",gap:16,cursor:"pointer",
          paddingBottom:24,paddingTop:i>0?24:0,
          borderBottom:i<RECOMMENDED_ARTICLES.length-1?"1px solid rgba(255,255,255,0.08)":"none"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:600,color:"#ffffff",lineHeight:1.45,marginBottom:8}}>
            {a.title}
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",fontWeight:500}}>{a.time}</div>
        </div>
        <div style={{width:80,height:80,borderRadius:14,flexShrink:0,overflow:"hidden"}}>
          <img src={a.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        </div>
      </div>
    ))}
  </div>
);

const CardContent = ({ item, onAuthorTap, onRefsTap, onArticleTap, onQuizTap, active, isMuted }) => {
  if(!item) return null;
  if(item.type==="video")       return <VideoCard   item={item} onAuthorTap={onAuthorTap} onRefsTap={onRefsTap} active={active} isMuted={isMuted}/>;
  if(item.type==="article")     return <ArticleCard item={item} onAuthorTap={onAuthorTap} onArticleTap={onArticleTap}/>;
  if(item.type==="quiz")        return <QuizCard    item={item} onAuthorTap={onAuthorTap} onQuizTap={onQuizTap}/>;
  if(item.type==="recommended") return <RecommendedCard onArticleTap={onArticleTap}/>;
  return null;
};

const InvisibleBtn = ({ icon, count, active, onClick }) => (
  <button onClick={onClick} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:0,cursor:"pointer",color:active?"white":"rgba(255,255,255,0.75)"}}>
    <span className="material-symbols-rounded" style={{fontSize:26,fontVariationSettings:active?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300",filter:"drop-shadow(0 1px 4px rgba(0,0,0,0.6))"}}>{icon}</span>
    {count!==undefined && <span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.85)",textShadow:"0 1px 4px rgba(0,0,0,0.7)"}}>{count}</span>}
  </button>
);

const SideActions = ({ item, isMuted, onToggleMute, onShareTap }) => {
  const [liked,setLiked]=useState(false);
  const [saved,setSaved]=useState(false);
  const isVideo=item.type==="video";
  return (
    <div style={{position:"absolute",right:14,bottom:108,zIndex:30,display:"flex",flexDirection:"column",gap:22,alignItems:"center"}}>
      {isVideo && (
        <button onClick={onToggleMute} style={{background:"rgba(255,255,255,0.08)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"50%",width:44,height:44,cursor:"pointer",color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span className="material-symbols-rounded" style={{fontSize:22,fontVariationSettings:"'FILL' 0,'wght' 300"}}>{isMuted?"volume_off":"volume_up"}</span>
        </button>
      )}
      <InvisibleBtn icon="bookmark" count={item.saves+(saved?1:0)} active={saved} onClick={()=>setSaved(s=>!s)}/>
      <InvisibleBtn icon="favorite" count={item.likes+(liked?1:0)} active={liked} onClick={()=>setLiked(l=>!l)}/>
      <button
        onPointerDown={e => e.stopPropagation()}
        onClick={e => { e.stopPropagation(); onShareTap && onShareTap(); }}
        style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"8px",cursor:"pointer",color:"rgba(255,255,255,0.75)"}}>
        <span className="material-symbols-rounded" style={{fontSize:26,fontVariationSettings:"'FILL' 0,'wght' 300",filter:"drop-shadow(0 1px 4px rgba(0,0,0,0.6))"}}>share</span>
      </button>
    </div>
  );
};

const NavBar = ({ active, setActive, lightMode }) => (
  <div style={{position:"absolute",top:0,left:0,right:0,zIndex:20,
    background:lightMode?"transparent":"linear-gradient(to bottom,rgba(0,0,0,0.65) 0%,transparent 100%)",
    display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 18px 32px"}}>
    <div style={{display:"flex",gap:24}}>
      {["Descobrir","Aprender"].map(t=>(
        <button key={t} onClick={()=>setActive(t)} style={{background:"none",border:"none",cursor:"pointer",
          color:lightMode?(active===t?"#0d0d0d":"rgba(0,0,0,0.3)"):(active===t?"white":"rgba(255,255,255,0.4)"),
          fontSize:15,fontWeight:active===t?700:400,padding:0,
          borderBottom:active===t?`2px solid ${lightMode?"#0d0d0d":"white"}`:"2px solid transparent",
          paddingBottom:4}}>{t}</button>
      ))}
    </div>
    <button style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"6px",width:36,height:36}}>
      {[0,1,2].map(i=><span key={i} style={{display:"block",width:20,height:1.8,
        background:lightMode?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.85)",borderRadius:2}}/>)}
    </button>
  </div>
);

const TopTag = ({ specialty, time, accent }) => (
  <div style={{position:"absolute",top:0,left:0,right:0,zIndex:15,padding:"80px 18px 0",pointerEvents:"none"}}>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <span style={{background:`${accent}44`,backdropFilter:"blur(8px)",border:`1px solid ${accent}77`,borderRadius:20,padding:"3px 10px",fontSize:11,color:"white",fontWeight:700}}>{specialty}</span>
      <span style={{fontSize:11,color:"rgba(255,255,255,0.45)"}}>• {time}</span>
    </div>
  </div>
);

const BottomBar = ({ lightMode }) => (
  <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:20,
    background:lightMode?"rgba(255,255,255,0.92)":"linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 100%)",
    backdropFilter:lightMode?"blur(12px)":"none",
    padding:"16px 16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",pointerEvents:"none"}}>
    <div style={{width:56}}/>
    <div style={{background:lightMode?"rgba(0,0,0,0.07)":"rgba(255,255,255,0.1)",backdropFilter:"blur(16px)",
      border:lightMode?"1px solid rgba(0,0,0,0.1)":"1px solid rgba(255,255,255,0.2)",
      borderRadius:28,height:56,padding:"0 22px",display:"flex",alignItems:"center",gap:6,
      color:lightMode?"#0d0d0d":"white",fontSize:12,cursor:"pointer",fontWeight:600,pointerEvents:"auto"}}>
      <span>Para você</span>
      <span className="material-symbols-rounded" style={{fontSize:18,opacity:.6}}>expand_more</span>
    </div>
    <button style={{background:"rgba(255,255,255,0.08)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"50%",width:56,height:56,cursor:"pointer",color:"white",display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"auto"}}>
      <span className="material-symbols-rounded" style={{fontSize:22}}>tune</span>
    </button>
  </div>
);

const AuthorSheet = ({ name, onClose }) => {
  const info = AUTHORS[name] || { bio:"Informações não disponíveis." };
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef(null);
  useEffect(()=>{ requestAnimationFrame(()=>setVisible(true)); },[]);
  const close = () => { setVisible(false); setDragY(0); setTimeout(onClose,300); };
  const onDS = e => { dragStart.current = e.type==="touchstart"?e.touches[0].clientY:e.clientY; };
  const onDM = e => { if(dragStart.current===null)return; const y=(e.type==="touchmove"?e.touches[0].clientY:e.clientY)-dragStart.current; if(y>0)setDragY(y); };
  const onDE = () => { if(dragY>80)close(); else setDragY(0); dragStart.current=null; };
  return (
    <div onClick={close} style={{position:"absolute",inset:0,zIndex:50,background:visible?"rgba(0,0,0,0.5)":"rgba(0,0,0,0)",backdropFilter:visible?"blur(4px)":"none",transition:"all .3s",display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxHeight:"82%",borderRadius:"24px 24px 0 0",background:"#ffffff",transform:visible?`translateY(${dragY}px)`:"translateY(100%)",transition:dragY>0?"none":"transform .3s cubic-bezier(.32,1,.4,1)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div onMouseDown={onDS} onMouseMove={onDM} onMouseUp={onDE} onMouseLeave={onDE} onTouchStart={onDS} onTouchMove={onDM} onTouchEnd={onDE} style={{flexShrink:0,display:"flex",justifyContent:"center",padding:"12px 0 8px",cursor:"grab"}}>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(0,0,0,0.15)"}}/>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"8px 24px 32px",WebkitOverflowScrolling:"touch"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
            <Avatar name={name} size={64}/>
            <div>
              <div style={{color:"#111",fontSize:17,fontWeight:800,lineHeight:1.2}}>{name}</div>
              <div style={{color:"rgba(0,0,0,0.4)",fontSize:12,marginTop:4,fontWeight:600}}>Autor(a)</div>
            </div>
          </div>
          {info.bio.split("\n\n").map((p,i)=>(
            <p key={i} style={{color:"rgba(0,0,0,0.65)",fontSize:14,lineHeight:1.75,margin:i===0?"0 0 12px":"12px 0"}}>{p}</p>
          ))}
          <button onClick={close} style={{marginTop:24,width:"100%",height:52,borderRadius:26,background:"#111",border:"none",color:"white",fontSize:14,fontWeight:700,cursor:"pointer"}}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const RefsSheet = ({ refs, onClose }) => {
  const refList = Array.isArray(refs) ? refs : [{ label: refs, url: refs }];
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef(null);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setDragY(0); setTimeout(onClose, 300); };
  const onDS = e => { dragStart.current = e.type === "touchstart" ? e.touches[0].clientY : e.clientY; };
  const onDM = e => { if (dragStart.current === null) return; const y = (e.type === "touchmove" ? e.touches[0].clientY : e.clientY) - dragStart.current; if (y > 0) setDragY(y); };
  const onDE = () => { if (dragY > 80) close(); else setDragY(0); dragStart.current = null; };
  return (
    <div onClick={close} style={{position:"absolute",inset:0,zIndex:50,background:visible?"rgba(0,0,0,0.5)":"rgba(0,0,0,0)",backdropFilter:visible?"blur(4px)":"none",transition:"all .3s",display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",borderRadius:"24px 24px 0 0",background:"#ffffff",transform:visible?`translateY(${dragY}px)`:"translateY(100%)",transition:dragY>0?"none":"transform .3s cubic-bezier(.32,1,.4,1)",padding:"0 0 36px"}}>
        <div onMouseDown={onDS} onMouseMove={onDM} onMouseUp={onDE} onMouseLeave={onDE} onTouchStart={onDS} onTouchMove={onDM} onTouchEnd={onDE} style={{display:"flex",justifyContent:"center",padding:"12px 0 8px",cursor:"grab"}}>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(0,0,0,0.15)"}}/>
        </div>
        <div style={{padding:"8px 24px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,paddingBottom:16,borderBottom:"1px solid rgba(0,0,0,0.07)"}}>
            <span className="material-symbols-rounded" style={{fontSize:22,color:"#111",fontVariationSettings:"'FILL' 0,'wght' 400"}}>menu_book</span>
            <span style={{color:"#111",fontSize:17,fontWeight:800}}>Referências</span>
          </div>
          {refList.map((ref, i) => (
            <a key={i} href={ref.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:i<refList.length-1?"1px solid rgba(0,0,0,0.07)":"none",textDecoration:"none"}}>
              <span className="material-symbols-rounded" style={{fontSize:18,color:"#2261B1",flexShrink:0,fontVariationSettings:"'FILL' 0,'wght' 400"}}>open_in_new</span>
              <span style={{color:"#2261B1",fontSize:13,fontWeight:600,wordBreak:"break-all",lineHeight:1.4}}>{ref.label !== ref.url ? ref.label : ref.url}</span>
            </a>
          ))}
          <button onClick={close} style={{marginTop:24,width:"100%",height:52,borderRadius:26,background:"#111",border:"none",color:"white",fontSize:14,fontWeight:700,cursor:"pointer"}}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const ShareSheet = ({ onClose }) => {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef(null);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setDragY(0); setTimeout(onClose, 300); };
  const onDS = e => { dragStart.current = e.type === "touchstart" ? e.touches[0].clientY : e.clientY; };
  const onDM = e => { if (dragStart.current === null) return; const y = (e.type === "touchmove" ? e.touches[0].clientY : e.clientY) - dragStart.current; if (y > 0) setDragY(y); };
  const onDE = () => { if (dragY > 80) close(); else setDragY(0); dragStart.current = null; };
  const circleStyle = { width:52,height:52,borderRadius:"50%",border:"1.5px solid rgba(0,0,0,0.1)",background:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 };
  const btnStyle = { display:"flex",flexDirection:"column",alignItems:"center",gap:7,background:"none",border:"none",cursor:"pointer",padding:0 };
  const labelStyle = { fontSize:11,color:"rgba(0,0,0,0.5)",fontWeight:600,textAlign:"center",lineHeight:1.2 };
  const matIcon = (name) => <span className="material-symbols-rounded" style={{fontSize:22,color:"#222",fontVariationSettings:"'FILL' 0,'wght' 300"}}>{name}</span>;
  const row1 = [
    { label:"X",          el:<svg viewBox="0 0 24 24" width="19" height="19" fill="#111"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.265 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label:"WhatsApp",   el:<svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { label:"Facebook",   el:<svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { label:"LinkedIn",   el:<svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label:"Copiar link",el:matIcon("link") },
    { label:"E-mail",     el:matIcon("mail") },
  ];
  return (
    <div onClick={close} style={{position:"absolute",inset:0,zIndex:70,background:visible?"rgba(0,0,0,0.45)":"rgba(0,0,0,0)",backdropFilter:visible?"blur(6px)":"none",transition:"all .3s",display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",borderRadius:"24px 24px 0 0",background:"#f5f5f5",transform:visible?`translateY(${dragY}px)`:"translateY(100%)",transition:dragY>0?"none":"transform .3s cubic-bezier(.32,1,.4,1)",padding:"0 22px 40px"}}>
        <div onMouseDown={onDS} onMouseMove={onDM} onMouseUp={onDE} onMouseLeave={onDE} onTouchStart={onDS} onTouchMove={onDM} onTouchEnd={onDE}
          style={{display:"flex",justifyContent:"center",padding:"12px 0 10px",cursor:"grab"}}>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(0,0,0,0.14)"}}/>
        </div>
        <div style={{fontSize:17,fontWeight:800,color:"#111",marginBottom:4}}>Compartilhar conteúdo</div>
        <div style={{fontSize:13,color:"rgba(0,0,0,0.42)",marginBottom:22}}>Por onde você quer compartilhar?</div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
          {row1.map((opt,i)=>(
            <button key={i} onClick={e=>e.stopPropagation()} style={btnStyle}>
              <div style={circleStyle}>{opt.el}</div>
              <span style={labelStyle}>{opt.label}</span>
            </button>
          ))}
        </div>
        <button onClick={e=>e.stopPropagation()} style={btnStyle}>
          <div style={circleStyle}>{matIcon("more_horiz")}</div>
          <span style={labelStyle}>Mais</span>
        </button>
      </div>
    </div>
  );
};

const PASS = "TesteDescobrir2026Jun";

const LoginScreen = ({ onUnlock }) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (value === PASS) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"16px 0 24px",background:"transparent"}}>
      <div style={{width:393,height:852,borderRadius:44,overflow:"hidden",position:"relative",
        boxShadow:"0 32px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.08)",
        background:"linear-gradient(160deg,#0a1628 0%,#0d2140 50%,#0a1628 100%)",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 36px"}}>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%,60%{transform:translateX(-8px)}
            40%,80%{transform:translateX(8px)}
          }
          @keyframes loginFadeIn {
            from{opacity:0;transform:translateY(24px)}
            to{opacity:1;transform:translateY(0)}
          }
        `}</style>
        <div style={{animation:"loginFadeIn .5s ease forwards",width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:72,height:72,borderRadius:22,background:"rgba(255,255,255,0.07)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:28}}>
            <span className="material-symbols-rounded" style={{fontSize:36,color:"white",fontVariationSettings:"'FILL' 0,'wght' 300"}}>lock</span>
          </div>
          <div style={{color:"white",fontSize:26,fontWeight:800,marginBottom:8,letterSpacing:-0.5}}>MediFeed</div>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:14,fontWeight:500,marginBottom:48}}>Acesso restrito</div>

          <div style={{width:"100%",animation:shake?"shake .5s ease":"none"}}>
            <div style={{position:"relative",width:"100%",marginBottom:16}}>
              <input
                type={show ? "text" : "password"}
                placeholder="Digite a senha"
                value={value}
                onChange={e=>{ setValue(e.target.value); setError(false); }}
                onKeyDown={e=>{ if(e.key==="Enter") handleSubmit(); }}
                style={{width:"100%",height:56,borderRadius:16,background:"rgba(255,255,255,0.07)",
                  backdropFilter:"blur(12px)",border:`1.5px solid ${error?"#e57373":value?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)"}`,
                  color:"white",fontSize:16,fontWeight:600,padding:"0 52px 0 20px",outline:"none",
                  boxSizing:"border-box",transition:"border .2s",
                  WebkitUserSelect:"text",userSelect:"text"}}
              />
              <button onClick={()=>setShow(s=>!s)} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}>
                <span className="material-symbols-rounded" style={{fontSize:20,color:"rgba(255,255,255,0.4)",fontVariationSettings:"'FILL' 0,'wght' 300"}}>{show?"visibility_off":"visibility"}</span>
              </button>
            </div>
            {error && <div style={{color:"#ef9a9a",fontSize:12,fontWeight:600,marginBottom:16,textAlign:"center"}}>Senha incorreta. Tente novamente.</div>}
            <button onClick={handleSubmit} style={{width:"100%",height:56,borderRadius:16,
              background:"white",border:"none",color:"#0a1628",
              fontSize:15,fontWeight:800,cursor:"pointer",letterSpacing:0.2,
              transition:"opacity .15s",opacity:value?1:0.45}}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MediFeed() {
  const [unlocked, setUnlocked] = useState(false);
  const [visibleIdx, setVisibleIdx] = useState(0);
  const [navTab, setNavTab] = useState("Descobrir");
  const [sheetAuthor, setSheetAuthor] = useState(null);
  const [sheetRefs, setSheetRefs] = useState(null);
  const [sheetArticle, setSheetArticle] = useState(null);
  const [sheetQuiz, setSheetQuiz] = useState(null);
  const [sheetShare, setSheetShare] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const scrollRef = useRef(null);
  const ticking = useRef(false);

  const toggleMute = useCallback(() => {
    setIsMuted(m => !m);
  }, []);

  useEffect(()=>{
    const links=[
      {rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,400&display=swap"},
      {rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"},
    ];
    const els=links.map(a=>{const l=document.createElement("link");Object.assign(l,a);document.head.appendChild(l);return l;});
    const s=document.createElement("style");
    s.textContent=`
      *:not(.material-symbols-rounded){font-family:'Nunito Sans',sans-serif!important;box-sizing:border-box;}
      .material-symbols-rounded{font-family:'Material Symbols Rounded'!important;}
      *{-webkit-user-select:none;user-select:none;}
      @keyframes feedbackFade{0%{opacity:0;filter:blur(10px);transform:scale(0.8)}15%{opacity:1;filter:blur(0px);transform:scale(1)}70%{opacity:1;filter:blur(0px);transform:scale(1)}100%{opacity:0;filter:blur(10px);transform:scale(1.15)}}
    `;
    document.head.appendChild(s);
    return()=>{els.forEach(l=>document.head.removeChild(l));document.head.removeChild(s);};
  },[]);

  const handleScroll = useCallback(() => {
    if(ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(()=>{
      if(scrollRef.current){
        const idx = Math.round(scrollRef.current.scrollTop / H);
        setVisibleIdx(Math.max(0, Math.min(CONTENT.length + EXTRA_CONTENT.length, idx)));
      }
      ticking.current = false;
    });
  }, []);

  const isEndCard = visibleIdx === CONTENT.length;
  const isRecommendedCard = visibleIdx === CONTENT.length + EXTRA_CONTENT.length;
  const item = visibleIdx < CONTENT.length
    ? CONTENT[visibleIdx]
    : isEndCard
      ? CONTENT[CONTENT.length-1]
      : EXTRA_CONTENT[visibleIdx - CONTENT.length - 1] || CONTENT[CONTENT.length-1];

  if (!unlocked) return <LoginScreen onUnlock={() => setUnlocked(true)} />;

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"16px 0 24px",background:"transparent"}}>
      <div style={{width:393,height:H,borderRadius:44,overflow:"hidden",position:"relative",
        boxShadow:"0 32px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.08)"}}>

        <div ref={scrollRef} onScroll={handleScroll}
          onMouseDown={e => {
            if (sheetArticle || sheetQuiz || sheetShare) return;
            const el = scrollRef.current;
            const startY = e.clientY;
            const startTop = el.scrollTop;
            let moved = false;
            const onMove = mv => {
              moved = true;
              el.scrollTop = startTop - (mv.clientY - startY);
            };
            const onUp = mv => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
              if(!moved) return;
              const idx = Math.round(el.scrollTop / H);
              el.scrollTo({ top: Math.max(0, Math.min(CONTENT.length-1, idx)) * H, behavior:"smooth" });
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
          style={{position:"absolute",inset:0,overflowY:(sheetArticle||sheetQuiz||sheetShare)?"hidden":"scroll",
            scrollSnapType:"y mandatory",
            scrollbarWidth:"none",
            msOverflowStyle:"none",
            cursor:"grab",
            zIndex:1,
          }}>
          <style>{`.feed-strip::-webkit-scrollbar{display:none}`}</style>
          {CONTENT.map((c, i) => (
            <div key={i} style={{width:"100%",height:H,flexShrink:0,
              scrollSnapAlign:"start",scrollSnapStop:"always",
              position:"relative",overflow:"hidden"}}>
              <CardContent item={c} onAuthorTap={()=>setSheetAuthor(c.author)} onRefsTap={()=>setSheetRefs(c.refs)} onArticleTap={item=>setSheetArticle(item)} onQuizTap={item=>setSheetQuiz(item)} active={i===visibleIdx} isMuted={isMuted}/>
            </div>
          ))}
          <div style={{width:"100%",height:H,flexShrink:0,scrollSnapAlign:"start",scrollSnapStop:"always",position:"relative",overflow:"hidden"}}>
            <EndOfFeedCard onHistoryTap={()=>{}}/>
          </div>
          {EXTRA_CONTENT.map((c, i) => {
            const idx = CONTENT.length + 1 + i;
            return (
              <div key={`extra-${i}`} style={{width:"100%",height:H,flexShrink:0,
                scrollSnapAlign:"start",scrollSnapStop:"always",
                position:"relative",overflow:"hidden"}}>
                <CardContent item={c} onAuthorTap={()=>setSheetAuthor(c.author)} onRefsTap={()=>setSheetRefs(c.refs)} onArticleTap={item=>setSheetArticle(item)} onQuizTap={item=>setSheetQuiz(item)} active={idx===visibleIdx} isMuted={isMuted}/>
              </div>
            );
          })}
        </div>

        <NavBar active={navTab} setActive={setNavTab}/>
        {!isEndCard && !isRecommendedCard && <TopTag specialty={item.specialty} time={item.time} accent={item.accent}/>}
        {!isEndCard && !isRecommendedCard && <SideActions item={item} isMuted={isMuted} onToggleMute={toggleMute} onShareTap={()=>setSheetShare(true)}/>}
        <BottomBar/>

        <div style={{position:"absolute",right:5,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:4,zIndex:5,pointerEvents:"none"}}>
          {[...CONTENT.map((_,i)=>i), CONTENT.length, ...EXTRA_CONTENT.map((_,i)=>CONTENT.length+1+i)].map(i=>(
            <div key={i} style={{width:3,height:i===visibleIdx?22:5,borderRadius:4,transition:"all .3s",
              background:i===visibleIdx?"white":"rgba(255,255,255,0.22)"}}/>
          ))}
        </div>

        {sheetAuthor && <AuthorSheet name={sheetAuthor} onClose={()=>setSheetAuthor(null)}/>}
        {sheetRefs && <RefsSheet refs={sheetRefs} onClose={()=>setSheetRefs(null)}/>}
        {sheetArticle && <ArticlePage item={sheetArticle} onClose={()=>setSheetArticle(null)} onShare={()=>setSheetShare(true)}/>}
        {sheetQuiz && <QuizPage item={sheetQuiz} onClose={()=>setSheetQuiz(null)} onShare={()=>setSheetShare(true)}/>}
        {sheetShare && <ShareSheet onClose={()=>setSheetShare(null)}/>}
      </div>
    </div>
  );
}
