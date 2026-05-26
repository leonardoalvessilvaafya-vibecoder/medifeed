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
  “Afya”: { image:”/afya-logo.png”, bio:”Afya – que significa “saúde e bem-estar” no dialeto africano suaíli – nasceu da união da NRE Educacional, maior grupo de faculdades de Medicina do país (criado em 1999), com a MEDCEL, marca de cursos preparatórios para prova de residência médica. A primeira faculdade do grupo começou a operar em Tocantins, no Norte do país.\n\nCom sede em Nova Lima (MG), a Afya é uma companhia de capital aberto, com ações negociadas na bolsa de valores NASDAQ, nos Estados Unidos, desde 2019.\n\nMissão: Integrar educação e soluções para a prática médica, potencializando formação, atualização, assertividade, produtividade e conexão dos médicos com o ecossistema de saúde.\n\nPropósito: Transformar a saúde em conjunto com quem tem a Medicina como vocação." },
  "Dra. Fernanda Lima": { bio:"Médica especialista em medicina do trabalho e saúde integrativa. Doutora pela USP, com mais de 15 anos de experiência em bem-estar de profissionais de saúde. Autora do livro 'Médicos também adoecem'." },
  "Dr. Rafael Monteiro": { bio:"Cardiologista intervencionista formado pelo InCor-HCFMUSP. Fellow do American College of Cardiology. Pesquisador nas áreas de insuficiência cardíaca e dispositivos implantáveis." },
  "Dra. Camila Souza": { bio:"Endocrinologista com fellowship em diabetes e doenças da tireoide pela UNIFESP. Membro da Sociedade Brasileira de Endocrinologia e Metabologia. Apaixonada por educação médica continuada." },
  "Ícaro Sampaio": { bio:"Graduação em Medicina pela Universidade Federal do Vale do São Francisco. Residência em Clínica Médica pelo Hospital Regional de Juazeiro - BA. Residência em Endocrinologia e Metabologia pelo Hospital das Clínicas da UFPE. Título de Especialista pela Sociedade Brasileira de Endocrinologia e Metabologia. Médico Assistente e Preceptor no Serviço de Endocrinologia do Hospital das Clínicas da UFPE." },
  "Ariane Vieira Scarlatelli Macedo": { bio:"Médica cardiologista com atuação em cardio-oncologia. Revisão científica por Gabriel Quintino. Publicado em 25 de maio de 2026 no Portal Afya." },
  "Dr. Bruno Alves": { bio:"Neurologista clínico e neurofisiologista. Especialização em neurologia vascular pela Santa Casa de São Paulo. Coordenador do Protocolo de AVC do Hospital das Clínicas." },
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
  { type:"video", specialty:"Afya News", author:"Afya", time:"22/05/2026 às 08:00", duration:2, title:"22/05/26 | Afya News: Receitas Digitais, Dulaglutida na Visão e Inovação no SUS", saves:38, likes:432, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779452047/21_05_26___Afya_News__Alerta_OPAS_para_Ebola_V%C3%ADrus_Andes_e_Cuidado_Feminino_bh7mjk.mp4" },
  { type:"video", specialty:"Carreira", author:"Afya", time:"Há 2h", duration:38, durationUnit:"seg", title:"Carreira médica sustentável: O que avaliar a longo prazo? | Afya Responde", saves:0, likes:0, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779707311/Carreira_m%C3%A9dica_sustent%C3%A1vel_O_que_avaliar_a_longo_prazo_Afya_Responde_opmpgi.mp4" },
  { type:"video", specialty:"Endocrinologia", author:"Ícaro Sampaio", time:"Há 15 min", duration:25, durationUnit:"seg", title:"Canetas emagrecedoras: precisam ser utilizadas com responsabilidade | Afya News", saves:0, likes:0, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779707317/Canetas_emagrecedoras_precisam_ser_utilizadas_com_responsabilidade_Afya_News_f8pqpn.mp4" },
  { type:"video", specialty:"Afya Responde", author:"Afya", time:"Há 32 min", duration:36, durationUnit:"seg", title:"A especialização médica impulsiona a carreira? | Afya Responde", saves:0, likes:0, videoSrc:"https://res.cloudinary.com/dszbi9qer/video/upload/v1779711096/A_especializa%C3%A7%C3%A3o_m%C3%A9dica_impulsiona_a_carreira_Afya_Responde_lzpy5e.mp4" },
  { type:"video", specialty:"Cardiologia", author:"Dr. Rafael Monteiro", time:"Há 1 h", duration:12, title:"Manejo da fibrilação atrial: do diagnóstico ao controle do ritmo em 2025", saves:61, likes:874, refs:"https://pubmed.ncbi.nlm.nih.gov" },
  { type:"video", specialty:"Endocrinologia", author:"Dra. Camila Souza", time:"Há 3 h", duration:9, title:"Obesidade e GLP-1: o que mudou na prática clínica com semaglutida e tirzepatida", saves:110, likes:1240, refs:"https://pubmed.ncbi.nlm.nih.gov" },
  { type:"video", specialty:"Neurologia", author:"Dr. Bruno Alves", time:"Há 5 h", duration:7, title:"Cefaleia em salvas: diagnóstico diferencial e abordagem terapêutica atualizada", saves:44, likes:503 },
];
const QUIZZES = [
  { type:"quiz", specialty:"Medicina de Emergência", author:"Afya", time:"Há 5 min", q:"Mulher de 62 anos, hipertensa, com dor torácica que piora à respiração profunda e troponina elevada após infecção viral recente. Qual o diagnóstico?", opts:["Embolia pulmonar","Dissecção de aorta","Infarto agudo do miocárdio","Miopericardite"], correct:3, comment:"O ultrassom do coração mostra um derrame pericárdico pequeno, o que juntamente com o quadro clínico, as alterações laboratoriais e a história de infecção viral recente reforçam o diagnóstico de miopericardite aguda.\n\nA pericardite é uma inflamação do pericárdio, que é uma fina membrana que reveste o coração.\n\nO quadro clínico característico é de dor torácica ventilatório dependente, que melhora com a flexão do tronco para frente (prece maometana). Pode haver febre associada.\n\nA presença de troponina positiva também pode ocorrer e representa a lesão de miócitos, definindo um quadro de miopericardite.\n\nO exame físico pode demonstrar a presença de atrito pericárdico. Há várias etiologias de pericardite (autoimune, neoplásica, bacteriana…) e as mais comuns são virais e idiopáticas.\n\nAs alterações mais comuns do eletrocardiograma são: supradesnivelamento difuso do segmento ST, taquicardia sinusal e infradesnivelamento difuso do segmento PR.\n\nO ecocardiograma normalmente evidencia a presença de derrame pericárdico.", commentRef:"Acute pericarditis: Clinical presentation and diagnosis. Massimo Imazio, et al. UPTODATE, november 2023.", likes:198, refs:"https://portal.afya.com.br" },
  { type:"quiz", specialty:"Neurologia", author:"Dr. Bruno Alves", time:"Há 15 min", q:"Em qual janela terapêutica a trombólise com alteplase é mais eficaz no AVC isquêmico?", opts:["Até 1h","Até 3–4,5h","Até 8h","Até 12h"], correct:1, comment:"A janela terapêutica de 3 a 4,5 horas é a recomendada pelas principais diretrizes para uso do alteplase no AVC isquêmico agudo. Dentro desse período, o benefício supera o risco de transformação hemorrágica.\n\nPacientes tratados na janela de 0–3h apresentam os maiores benefícios, com NNT de aproximadamente 8. Entre 3–4,5h, o benefício é menor mas ainda clinicamente significativo, com algumas restrições de elegibilidade (ex.: uso de anticoagulantes orais, AVC grave).\n\nApós 4,5 horas, a trombectomia mecânica pode ser considerada em casos selecionados com imagem favorável (mismatch clínico-radiológico), estendendo a janela até 24 horas em centros especializados.", commentRef:"Powers WJ et al. 2019 AHA/ASA Guidelines for the Early Management of Acute Ischemic Stroke. Stroke. 2019.", likes:389, refs:"https://www.sbne.org.br" },
  { type:"quiz", specialty:"Endocrinologia", author:"Dra. Camila Souza", time:"Há 30 min", q:"Qual exame confirma o diagnóstico de diabetes mellitus tipo 2?", opts:["Glicemia em jejum ≥126 mg/dL","HbA1c <5,7%","Insulinemia de jejum","Peptídeo C elevado"], correct:0, comment:"O diagnóstico de diabetes mellitus tipo 2 é confirmado por glicemia de jejum ≥126 mg/dL em duas ocasiões distintas, ou por um único resultado associado a sintomas clássicos como poliúria, polidipsia e perda de peso.\n\nOutros critérios diagnósticos aceitos incluem: glicemia 2h após sobrecarga de 75g de glicose ≥200 mg/dL, HbA1c ≥6,5% (não <5,7% que indica normoglicemia), ou glicemia casual ≥200 mg/dL com sintomas.\n\nA insulinemia de jejum e o peptídeo C são úteis para diferenciar DM tipo 1 do tipo 2 e avaliar a reserva pancreática, mas não são critérios diagnósticos para DM2. O rastreamento é recomendado em adultos a partir dos 35 anos ou mais cedo na presença de fatores de risco.", commentRef:"American Diabetes Association. Standards of Medical Care in Diabetes 2024. Diabetes Care.", likes:276, refs:"https://www.sbem.org.br" },
  { type:"quiz", specialty:"Gastroenterologia", author:"Dra. Fernanda Lima", time:"Há 45 min", q:"Qual é o principal fator de risco para adenocarcinoma de esôfago?", opts:["H. pylori","Esôfago de Barrett","Acalasia","Doença de Crohn"], correct:1, comment:"O esôfago de Barrett é a principal lesão precursora do adenocarcinoma de esôfago, resultante da metaplasia intestinal do epitélio esofágico em resposta à exposição crônica ao ácido gástrico e bile.\n\nA progressão de Barrett sem displasia para adenocarcinoma ocorre em cerca de 0,1 a 0,3% ao ano. A presença de displasia de alto grau eleva esse risco substancialmente, justificando vigilância endoscópica intensiva e tratamento endoscópico ou cirúrgico precoce.\n\nO H. pylori está associado ao adenocarcinoma gástrico, não esofágico. A acalasia eleva o risco de carcinoma espinocelular de esôfago, não adenocarcinoma. O controle do refluxo gastroesofágico é a principal estratégia de prevenção primária do Barrett e sua progressão maligna.", commentRef:"Shaheen NJ et al. ACG Clinical Guideline: Diagnosis and Management of Barrett's Esophagus. Am J Gastroenterol. 2022.", likes:154, refs:"https://www.febrasgo.org.br" },
];
const ARTICLES = [
  { type:"article", specialty:"Cardiologia", author:"Ariane Vieira Scarlatelli Macedo", time:"25/05/2026", duration:14, title:"Cardio-oncologia na prática: uma nova fronteira no cuidado do paciente com câncer", body:"Quando falamos do cuidado cardiovascular em nossos consultórios, nossa mente se volta imediatamente para condições como hipertensão, dislipidemia, doença coronária e insuficiência cardíaca. No entanto, um grupo de pacientes está crescendo em prevalência e complexidade, exigindo um olhar mais integrado: aqueles que estão em tratamento oncológico ou que o concluíram. Graças ao avanço das terapias oncológicas, esses pacientes estão vivendo mais, mas essa sobrevida aumentada expõe uma nova realidade: um risco cardiovascular significativamente maior.\n\nA abordagem tradicional de esperar que a cardiotoxicidade se manifeste para então tratá-la já não é suficiente. É fundamental abandonar essa visão reativa em favor de uma estratégia proativa, que reconhece o risco cardiovascular como um componente intrínseco da jornada oncológica desde o seu diagnóstico. Esse risco não surge apenas como consequência do tratamento, mas é influenciado por uma complexa interação de fatores — a própria biologia tumoral, o estado inflamatório sistêmico e as terapias oncológicas, que embora essenciais para a cura, podem atuar como gatilhos diretos para complicações cardiovasculares.\n\nCompreender as vias biológicas compartilhadas entre o câncer e a doença cardiovascular é o que fundamenta a prática clínica em cardio-oncologia. As duas condições frequentemente se encontram porque compartilham mecanismos fisiopatológicos comuns: inflamação crônica que acelera processos ateroscleróticos, disfunção endotelial que favorece a trombose, alterações metabólicas como resistência à insulina e dislipidemia, e estresse oxidativo que causa dano direto ao miocárdio e aos vasos.\n\nA avaliação realizada antes do início do tratamento oncológico é, talvez, o passo mais determinante para o sucesso da jornada do paciente. Uma avaliação basal estruturada ideal inclui anamnese e exame físico com foco em fatores de risco, eletrocardiograma, biomarcadores como troponinas e peptídeos natriuréticos, e ecocardiograma com strain longitudinal global. O strain, em particular, permite identificar vulnerabilidades subclínicas que passam despercebidas na avaliação convencional — uma queda maior que 15% em relação ao basal é sinal de alerta para cardiotoxicidade incipiente.\n\nO risco cardiovascular não desaparece ao final da última sessão de quimioterapia ou radioterapia. Para muitos sobreviventes de câncer, o risco permanece elevado por toda a vida. A cardio-oncologia não é mais uma subespecialidade de nicho — ela já faz parte do cotidiano de todos os cardiologistas. Ao final, nossa missão é permitir que o paciente não apenas sobreviva ao câncer, mas que tenha uma vida plena depois dele, com o coração preservado e confiança para seguir em frente.", saves:73, likes:892, refs:"https://portal.afya.com.br/cardiologia/cardio-oncologia-na-pratica-uma-nova-fronteira-no-cuidado-do-paciente-com-cancer" },
  { type:"article", specialty:"Endocrinologia", author:"Dra. Camila Souza", time:"Há 10 min", duration:5, title:"Hipotireoidismo subclínico: quando e como tratar em 2025", body:"A decisão de tratar o hipotireoidismo subclínico permanece controversa na literatura médica atual. Evidências recentes sugerem benefício em pacientes com TSH acima de 10 mUI/L, sintomas atribuíveis e fatores de risco cardiovascular estabelecidos. A levotiroxina em doses baixas melhora perfil lipídico e qualidade de vida em subgrupos selecionados, mas o rastreamento universal ainda não é recomendado pelas principais diretrizes internacionais, incluindo ATA e ETA.\n\nA avaliação clínica deve considerar a presença de anticorpos anti-TPO elevados, que aumentam o risco de progressão para hipotireoidismo franco em aproximadamente 4% ao ano. A ultrassonografia tireoidiana complementa a investigação ao identificar nódulos, tireoidite de Hashimoto e alterações volumétricas. Em mulheres em idade fértil ou gestantes, o limiar para tratamento é mais baixo, dada a associação com desfechos obstétricos adversos e desenvolvimento neurológico fetal.\n\nEm pacientes idosos acima de 70 anos, a evidência atual favorece conduta expectante, uma vez que TSH levemente elevado pode representar adaptação fisiológica protetora nessa faixa etária. O seguimento semestral com TSH e T4 livre é recomendado em todos os casos não tratados. A individualização da conduta, pautada no perfil clínico e nas preferências do paciente, permanece o pilar central da decisão terapêutica.", saves:55, likes:671 },
  { type:"article", specialty:"Gastroenterologia", author:"Dra. Fernanda Lima", time:"Há 35 min", duration:4, title:"Doença inflamatória intestinal: biomarcadores, biologics e o futuro do tratamento", body:"A doença de Crohn e a retocolite ulcerativa representam dois dos maiores desafios da gastroenterologia moderna. A introdução dos agentes biológicos — anti-TNF, anti-integrinas e inibidores de IL-12/23 — transformou os objetivos do tratamento, que agora miram a remissão endoscópica e a cicatrização mucosa. O monitoramento com calprotectina fecal e PCR ultrassensível permite ajuste terapêutico antes da recidiva clínica, reduzindo hospitalizações e cirurgias.\n\nA estratégia treat-to-target, incorporada às diretrizes do ECCO, exige reavaliações endoscópicas periódicas para confirmar a remissão histológica, hoje considerada o desfecho mais ambicioso e possivelmente mais protetor contra complicações a longo prazo. O monitoramento dos níveis séricos dos biológicos e a pesquisa de anticorpos anti-droga tornaram-se ferramentas essenciais para otimizar a terapia e evitar perda de resposta secundária, que acomete até 50% dos pacientes em uso de anti-TNF após 5 anos.\n\nO futuro do tratamento aponta para a medicina de precisão, com perfis genômicos e transcriptômicos da mucosa intestinal orientando a seleção do biológico mais adequado a cada fenótipo. Novos alvos moleculares, como os inibidores de JAK (tofacitinibe, upadacitinibe) e os anti-IL-23 de nova geração (risanquizumabe, mirikizumabe), ampliam o arsenal terapêutico disponível e oferecem opções seguras para pacientes refratários às classes anteriores.", saves:49, likes:537 },
];

const CONTENT = [];
const N = Math.min(VIDEOS.length, QUIZZES.length, ARTICLES.length);
for(let i=0;i<N;i++){ CONTENT.push(VIDEOS[i]); CONTENT.push(QUIZZES[i]); CONTENT.push(ARTICLES[i]); }
CONTENT.forEach(c => { const col=getSpecialtyColor(c.specialty); c.bg=col.grad; c.accent=col.base; c.bgBase=col.base; });

const H = 852;

const AuthorMeta = ({ item, onAuthorTap }) => (
  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10}}>
    <div onClick={e=>{e.stopPropagation();onAuthorTap&&onAuthorTap();}}
      style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <Avatar name={item.author} size={26}/>
      <span style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.6)"}}>{item.author}</span>
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
  const fbTimer = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.muted = isMuted;
      v.play().catch(() => {});
      setIsPlaying(true);
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

  const handleTap = () => {
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
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}
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
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:96,left:18,right:64,zIndex:3}}>
        {item.refs && <button onClick={e=>{e.stopPropagation();onRefsTap&&onRefsTap();}} style={{display:"inline-flex",alignItems:"center",gap:4,marginBottom:10,background:"none",border:"none",padding:0,cursor:"pointer",color:"rgba(255,255,255,0.55)",fontSize:11,fontWeight:600}}>
          <span className="material-symbols-rounded" style={{fontSize:14,fontVariationSettings:"'FILL' 0,'wght' 300"}}>menu_book</span>Referências
        </button>}
        <h2 style={{color:"white",fontSize:20,fontWeight:700,lineHeight:1.35,margin:0,textShadow:"0 2px 12px rgba(0,0,0,0.7)"}}>{item.title}</h2>
        <AuthorMeta item={item} onAuthorTap={onAuthorTap}/>
      </div>
    </div>
  );
};

const ArticleSheet = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const dragStart = useRef(null);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setDragY(0); setTimeout(onClose, 300); };
  const onDS = e => { dragStart.current = e.type === "touchstart" ? e.touches[0].clientY : e.clientY; };
  const onDM = e => { if (dragStart.current === null) return; const y = (e.type === "touchmove" ? e.touches[0].clientY : e.clientY) - dragStart.current; if (y > 0) setDragY(y); };
  const onDE = () => { if (dragY > 80) close(); else setDragY(0); dragStart.current = null; };
  const refList = item.refs ? (Array.isArray(item.refs) ? item.refs : [{ label: item.refs, url: item.refs }]) : [];
  return (
    <div onClick={close} style={{position:"absolute",inset:0,zIndex:50,background:visible?"rgba(0,0,0,0.45)":"rgba(0,0,0,0)",backdropFilter:visible?"blur(4px)":"none",transition:"all .3s",display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",height:"92%",borderRadius:"24px 24px 0 0",background:"#f8f8f8",transform:visible?`translateY(${dragY}px)`:"translateY(100%)",transition:dragY>0?"none":"transform .3s cubic-bezier(.32,1,.4,1)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div onMouseDown={onDS} onMouseMove={onDM} onMouseUp={onDE} onMouseLeave={onDE} onTouchStart={onDS} onTouchMove={onDM} onTouchEnd={onDE}
          style={{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 10px",cursor:"grab",background:"#f8f8f8"}}>
          <div style={{width:32}}/>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(0,0,0,0.13)"}}/>
          <button onClick={close} style={{width:32,height:32,borderRadius:"50%",background:"rgba(0,0,0,0.07)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span className="material-symbols-rounded" style={{fontSize:18,color:"#444"}}>close</span>
          </button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"4px 22px 40px",WebkitOverflowScrolling:"touch"}}>
          <div style={{background:"white",borderRadius:18,padding:"22px 18px 24px",marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            <h1 style={{color:"#111",fontSize:20,fontWeight:800,lineHeight:1.35,margin:"0 0 14px"}}>{item.title}</h1>
            <p style={{color:"rgba(0,0,0,0.45)",fontSize:13,lineHeight:1.65,margin:"0 0 18px"}}>{item.body.slice(0, 140)}…</p>
            <div style={{borderTop:"1px solid rgba(0,0,0,0.07)",paddingTop:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Avatar name={item.author} size={34}/>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#111",lineHeight:1.2}}>{item.author}</div>
                  <div style={{fontSize:11,color:"rgba(0,0,0,0.38)",marginTop:3}}>{item.time}{item.duration ? ` · ${item.duration} min` : ""}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                {[
                  {icon:saved?"bookmark":"bookmark",fill:saved,onClick:()=>setSaved(s=>!s),color:saved?"#2261B1":"#555"},
                  {icon:liked?"favorite":"favorite",fill:liked,onClick:()=>setLiked(l=>!l),color:liked?"#e94560":"#555"},
                  {icon:"share",fill:false,onClick:()=>{},color:"#555"},
                ].map((btn,i)=>(
                  <button key={i} onClick={btn.onClick} style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span className="material-symbols-rounded" style={{fontSize:18,color:btn.color,fontVariationSettings:btn.fill?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300"}}>{btn.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{background:"white",borderRadius:18,padding:"22px 18px 24px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            {item.body.split("\n\n").map((p,i,arr)=>(
              <p key={i} style={{color:"rgba(0,0,0,0.72)",fontSize:15,lineHeight:1.85,margin:i<arr.length-1?"0 0 18px":0}}>{p}</p>
            ))}
            {refList.length > 0 && (
              <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(0,0,0,0.07)"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#111",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                  <span className="material-symbols-rounded" style={{fontSize:16,fontVariationSettings:"'FILL' 0,'wght' 400"}}>menu_book</span>
                  Referências
                </div>
                {refList.map((ref, i) => (
                  <a key={i} href={ref.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none",color:"#2261B1",fontSize:13,fontWeight:600,padding:"8px 0",borderBottom:i<refList.length-1?"1px solid rgba(0,0,0,0.06)":"none"}}>
                    <span className="material-symbols-rounded" style={{fontSize:15,flexShrink:0,fontVariationSettings:"'FILL' 0,'wght' 400"}}>open_in_new</span>
                    <span style={{wordBreak:"break-all",lineHeight:1.4}}>{ref.label !== ref.url ? ref.label : ref.url}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
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

const QuizCommentSheet = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef(null);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const close = () => { setVisible(false); setDragY(0); setTimeout(onClose, 300); };
  const onDS = e => { dragStart.current = e.type==="touchstart"?e.touches[0].clientY:e.clientY; };
  const onDM = e => { if(dragStart.current===null)return; const y=(e.type==="touchmove"?e.touches[0].clientY:e.clientY)-dragStart.current; if(y>0)setDragY(y); };
  const onDE = () => { if(dragY>80)close(); else setDragY(0); dragStart.current=null; };
  return (
    <div onClick={close} style={{position:"absolute",inset:0,zIndex:50,background:visible?"rgba(0,0,0,0.5)":"rgba(0,0,0,0)",backdropFilter:visible?"blur(4px)":"none",transition:"all .3s",display:"flex",alignItems:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxHeight:"88%",borderRadius:"24px 24px 0 0",background:"#ffffff",transform:visible?`translateY(${dragY}px)`:"translateY(100%)",transition:dragY>0?"none":"transform .3s cubic-bezier(.32,1,.4,1)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div onMouseDown={onDS} onMouseMove={onDM} onMouseUp={onDE} onMouseLeave={onDE} onTouchStart={onDS} onTouchMove={onDM} onTouchEnd={onDE}
          style={{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 10px",cursor:"grab"}}>
          <div style={{width:32}}/>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(0,0,0,0.13)"}}/>
          <button onClick={close} style={{width:32,height:32,borderRadius:"50%",background:"rgba(0,0,0,0.07)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span className="material-symbols-rounded" style={{fontSize:18,color:"#444"}}>close</span>
          </button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"4px 22px 36px",WebkitOverflowScrolling:"touch"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,paddingBottom:16,borderBottom:"1px solid rgba(0,0,0,0.07)"}}>
            <div style={{width:38,height:38,borderRadius:12,background:"linear-gradient(135deg,#1a3a6b,#2261B1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span className="material-symbols-rounded" style={{fontSize:20,color:"white",fontVariationSettings:"'FILL' 0,'wght' 300"}}>clinical_notes</span>
            </div>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:"#111",lineHeight:1.2}}>Comentário da questão</div>
              <div style={{fontSize:12,color:"rgba(0,0,0,0.4)",marginTop:2}}>{item.author}</div>
            </div>
          </div>
          <div style={{background:"rgba(34,97,177,0.06)",borderRadius:14,padding:"14px 16px",marginBottom:18,borderLeft:"3px solid #2261B1"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#2261B1",marginBottom:4}}>Resposta correta</div>
            <div style={{fontSize:14,fontWeight:700,color:"#111"}}>{item.opts[item.correct]}</div>
          </div>
          {item.comment.split("\n\n").map((p,i)=>(
            <p key={i} style={{color:"rgba(0,0,0,0.7)",fontSize:14,lineHeight:1.8,margin:i===0?"0 0 14px":"14px 0"}}>{p}</p>
          ))}
          {item.commentRef && (
            <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
                <span className="material-symbols-rounded" style={{fontSize:14}}>menu_book</span>
                Referência bibliográfica
              </div>
              <p style={{fontSize:12,color:"rgba(0,0,0,0.5)",lineHeight:1.6,margin:0,fontStyle:"italic"}}>{item.commentRef}</p>
            </div>
          )}
          <button onClick={close} style={{marginTop:24,width:"100%",height:52,borderRadius:26,background:"#111",border:"none",color:"white",fontSize:14,fontWeight:700,cursor:"pointer"}}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const QuizCard = ({ item, onAuthorTap, onRefsTap, onCommentTap }) => {
  const [picked, setPicked] = useState(null);
  const isCorrect = picked === item.correct;
  const handlePick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (item.comment) setTimeout(() => onCommentTap && onCommentTap(item), 1200);
  };
  return (
    <div style={{position:"relative",width:"100%",height:"100%",background:item.bg,display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 18px 100px 18px"}}>
      <div style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:18,padding:22,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",marginBottom:10,letterSpacing:0.5,textTransform:"uppercase"}}>Questão do dia</div>
        <p style={{color:"white",fontSize:16,fontWeight:600,lineHeight:1.5,margin:0}}>{item.q}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {item.opts.map((opt,i)=>{
          const isPicked=picked===i, isRight=i===item.correct;
          let bg="rgba(255,255,255,0.07)",border="rgba(255,255,255,0.13)",color="rgba(255,255,255,0.85)";
          if(picked!==null){
            if(isRight){bg="rgba(100,200,100,0.2)";border="#81c784";color="#a5d6a7";}
            else if(isPicked){bg="rgba(200,80,80,0.2)";border="#e57373";color="#ef9a9a";}
            else{bg="rgba(255,255,255,0.03)";border="rgba(255,255,255,0.07)";color="rgba(255,255,255,0.35)";}
          }
          return (
            <button key={i} onClick={()=>handlePick(i)} style={{background:bg,backdropFilter:"blur(12px)",border:`1px solid ${border}`,borderRadius:14,padding:"16px 12px",fontSize:14,color,fontWeight:600,cursor:picked!==null?"default":"pointer",transition:"all .3s",textAlign:"center",lineHeight:1.3}}>{opt}</button>
          );
        })}
      </div>
      {picked !== null && (
        <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span className="material-symbols-rounded" style={{fontSize:20,color:isCorrect?"#81c784":"#e57373",fontVariationSettings:"'FILL' 1,'wght' 400"}}>{isCorrect?"check_circle":"cancel"}</span>
            <span style={{fontSize:13,fontWeight:700,color:isCorrect?"#a5d6a7":"#ef9a9a"}}>{isCorrect?"Você acertou! Excelente raciocínio.":"Não foi dessa vez, você selecionou a alternativa incorreta."}</span>
          </div>
          {item.comment && <button onClick={()=>onCommentTap&&onCommentTap(item)} style={{width:"100%",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:20,color:"white",fontSize:12,fontWeight:700,height:44,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            <span className="material-symbols-rounded" style={{fontSize:15,fontVariationSettings:"'FILL' 0,'wght' 300"}}>clinical_notes</span>
            Ver comentário
          </button>}
        </div>
      )}
      <div style={{position:"absolute",bottom:96,left:18,right:64,zIndex:2}}>
        {item.refs && <button onClick={e=>{e.stopPropagation();onRefsTap&&onRefsTap();}} style={{display:"inline-flex",alignItems:"center",gap:4,marginBottom:8,background:"none",border:"none",padding:0,cursor:"pointer",color:"rgba(255,255,255,0.5)",fontSize:11,fontWeight:600}}><span className="material-symbols-rounded" style={{fontSize:14,fontVariationSettings:"'FILL' 0,'wght' 300"}}>menu_book</span>Referências</button>}
        <AuthorMeta item={item} onAuthorTap={onAuthorTap}/>
      </div>
    </div>
  );
};

const CardContent = ({ item, onAuthorTap, onRefsTap, onArticleTap, onCommentTap, active, isMuted }) => {
  if(!item) return null;
  if(item.type==="video")   return <VideoCard   item={item} onAuthorTap={onAuthorTap} onRefsTap={onRefsTap} active={active} isMuted={isMuted}/>;
  if(item.type==="article") return <ArticleCard item={item} onAuthorTap={onAuthorTap} onArticleTap={onArticleTap}/>;
  if(item.type==="quiz")    return <QuizCard    item={item} onAuthorTap={onAuthorTap} onRefsTap={onRefsTap} onCommentTap={onCommentTap}/>;
  return null;
};

const InvisibleBtn = ({ icon, count, active, onClick }) => (
  <button onClick={onClick} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:0,cursor:"pointer",color:active?"white":"rgba(255,255,255,0.75)"}}>
    <span className="material-symbols-rounded" style={{fontSize:26,fontVariationSettings:active?"'FILL' 1,'wght' 400":"'FILL' 0,'wght' 300",filter:"drop-shadow(0 1px 4px rgba(0,0,0,0.6))"}}>{icon}</span>
    {count!==undefined && <span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.85)",textShadow:"0 1px 4px rgba(0,0,0,0.7)"}}>{count}</span>}
  </button>
);

const SideActions = ({ item, isMuted, onToggleMute }) => {
  const [liked,setLiked]=useState(false);
  const [saved,setSaved]=useState(false);
  const isQuiz=item.type==="quiz";
  const isVideo=item.type==="video";
  return (
    <div style={{position:"absolute",right:14,bottom:108,zIndex:20,display:"flex",flexDirection:"column",gap:22,alignItems:"center"}}>
      {isVideo && (
        <button onClick={onToggleMute} style={{background:"rgba(255,255,255,0.08)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"50%",width:44,height:44,cursor:"pointer",color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span className="material-symbols-rounded" style={{fontSize:22,fontVariationSettings:"'FILL' 0,'wght' 300"}}>{isMuted?"volume_off":"volume_up"}</span>
        </button>
      )}
      {!isQuiz && <InvisibleBtn icon="bookmark" count={item.saves+(saved?1:0)} active={saved} onClick={()=>setSaved(s=>!s)}/>}
      <InvisibleBtn icon="favorite" count={item.likes+(liked?1:0)} active={liked} onClick={()=>setLiked(l=>!l)}/>
      {!isQuiz && <InvisibleBtn icon="share" onClick={()=>{}}/>}
    </div>
  );
};

const NavBar = ({ active, setActive }) => (
  <div style={{position:"absolute",top:0,left:0,right:0,zIndex:20,background:"linear-gradient(to bottom,rgba(0,0,0,0.65) 0%,transparent 100%)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 18px 32px"}}>
    <div style={{display:"flex",gap:24}}>
      {["Descobrir","Aprender"].map(t=>(
        <button key={t} onClick={()=>setActive(t)} style={{background:"none",border:"none",cursor:"pointer",color:active===t?"white":"rgba(255,255,255,0.4)",fontSize:15,fontWeight:active===t?700:400,padding:0,borderBottom:active===t?"2px solid white":"2px solid transparent",paddingBottom:4}}>{t}</button>
      ))}
    </div>
    <button style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"6px",width:36,height:36}}>
      {[0,1,2].map(i=><span key={i} style={{display:"block",width:20,height:1.8,background:"rgba(255,255,255,0.85)",borderRadius:2}}/>)}
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

const BottomBar = () => (
  <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:20,background:"linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 100%)",padding:"28px 16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div style={{width:56}}/>
    <div style={{background:"rgba(255,255,255,0.1)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:28,height:56,padding:"0 22px",display:"flex",alignItems:"center",gap:6,color:"white",fontSize:12,cursor:"pointer",fontWeight:600}}>
      <span>Para você</span>
      <span className="material-symbols-rounded" style={{fontSize:18,opacity:.6}}>expand_more</span>
    </div>
    <button style={{background:"rgba(255,255,255,0.08)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"50%",width:56,height:56,cursor:"pointer",color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
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
  const [sheetComment, setSheetComment] = useState(null);
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
        setVisibleIdx(Math.max(0, Math.min(CONTENT.length-1, idx)));
      }
      ticking.current = false;
    });
  }, []);

  const item = CONTENT[visibleIdx] || CONTENT[0];

  if (!unlocked) return <LoginScreen onUnlock={() => setUnlocked(true)} />; // fontes já carregadas pelo useEffect acima

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"16px 0 24px",background:"transparent"}}>
      <div style={{width:393,height:H,borderRadius:44,overflow:"hidden",position:"relative",
        boxShadow:"0 32px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.08)"}}>

        <div ref={scrollRef} onScroll={handleScroll}
          onMouseDown={e => {
            if (sheetArticle || sheetComment) return;
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
          style={{position:"absolute",inset:0,overflowY:(sheetArticle||sheetComment)?"hidden":"scroll",
            scrollSnapType:"y mandatory",
            WebkitOverflowScrolling:"touch",
            scrollbarWidth:"none",
            msOverflowStyle:"none",
            cursor:"grab",
          }}>
          <style>{`.feed-strip::-webkit-scrollbar{display:none}`}</style>
          {CONTENT.map((c, i) => (
            <div key={i} style={{width:"100%",height:H,flexShrink:0,
              scrollSnapAlign:"start",scrollSnapStop:"always",
              position:"relative",overflow:"hidden"}}>
              <CardContent item={c} onAuthorTap={()=>setSheetAuthor(c.author)} onRefsTap={()=>setSheetRefs(c.refs)} onArticleTap={item=>setSheetArticle(item)} onCommentTap={item=>setSheetComment(item)} active={i===visibleIdx} isMuted={isMuted}/>
            </div>
          ))}
        </div>

        <NavBar active={navTab} setActive={setNavTab}/>
        <TopTag specialty={item.specialty} time={item.time} accent={item.accent}/>
        <SideActions item={item} isMuted={isMuted} onToggleMute={toggleMute}/>
        <BottomBar/>

        <div style={{position:"absolute",right:5,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:4,zIndex:5,pointerEvents:"none"}}>
          {CONTENT.map((_,i)=>(
            <div key={i} style={{width:3,height:i===visibleIdx?22:5,borderRadius:4,transition:"all .3s",
              background:i===visibleIdx?"white":"rgba(255,255,255,0.22)"}}/>
          ))}
        </div>

        {sheetAuthor && <AuthorSheet name={sheetAuthor} onClose={()=>setSheetAuthor(null)}/>}
        {sheetRefs && <RefsSheet refs={sheetRefs} onClose={()=>setSheetRefs(null)}/>}
        {sheetArticle && <ArticleSheet item={sheetArticle} onClose={()=>setSheetArticle(null)}/>}
        {sheetComment && <QuizCommentSheet item={sheetComment} onClose={()=>setSheetComment(null)}/>}
      </div>
    </div>
  );
}
