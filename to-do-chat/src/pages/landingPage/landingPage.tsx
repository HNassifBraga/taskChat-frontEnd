import { useNavigate } from "react-router-dom";

const contactEmail = "hnassifbraga755@gmail.com";
const linkedInUrl = "https://www.linkedin.com/in/henrique-nassif-19b999256";

const techs = [
  "React",
  "TypeScript",
  "Bootstrap",
  "Node.js",
  "Express",
  "Prisma ORM",
  "PostgreSQL",
  "Socket.io",
  "JWT com cookie HTTP-only",
];

const roles = [
  {
    tag: "CEO",
    title: "CEO",
    text: "Cria a empresa, aprova membros, gerencia permissões e acompanha tarefas da equipe.",
  },
  {
    tag: "ADMIN",
    title: "Administrador",
    text: "Ajuda na operação da empresa, cria tarefas e acompanha usuários sem gerenciar o CEO.",
  },
  {
    tag: "USER",
    title: "Usuário",
    text: "Recebe tarefas, conversa com colegas da empresa e acompanha o andamento do próprio trabalho.",
  },
];

const features = [
  {
    tag: "Chat",
    title: "Chat interno por empresa",
    text: "Usuários autenticados conversam em tempo real com colegas vinculados à mesma empresa.",
  },
  {
    tag: "Kanban",
    title: "Quadro de tarefas",
    text: "As demandas são organizadas por status como A fazer, Em revisão, Concluído, Cancelado e Atrasado.",
  },
  {
    tag: "Auth",
    title: "Autenticação segura",
    text: "O login usa JWT em cookie HTTP-only, com rotas privadas e controle de acesso no backend.",
  },
  {
    tag: "Equipe",
    title: "Gestão de membros",
    text: "CEO e administradores acompanham usuários ativos, solicitações pendentes e permissões da empresa.",
  },
  {
    tag: "Empresa",
    title: "Ambiente multiempresa",
    text: "Cada empresa trabalha em seu próprio espaço, com dados e conversas separados por companyId.",
  },
  {
    tag: "Auditoria",
    title: "Base para auditoria",
    text: "Ações importantes podem ser registradas no backend para acompanhar eventos do sistema.",
  },
];

const workflow = [
  "O usuário cria uma conta e entra com login seguro.",
  "Ele registra uma empresa ou solicita vínculo por CNPJ.",
  "O CEO ou administrador aprova membros pendentes.",
  "A equipe acessa o dashboard com chat interno e quadro de tarefas.",
  "Tarefas vencidas em A fazer podem ser marcadas como atrasadas no quadro.",
];

const taskColumns = ["A fazer", "Em revisão", "Concluído", "Atrasado"];

export default function TaskChatLanding() {
  const navigate = useNavigate();

  return (
    <main
      className="min-vh-100 text-white"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(99,102,241,.35), transparent 32%), radial-gradient(circle at top right, rgba(168,85,247,.25), transparent 30%), #0f172a",
      }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top border-bottom border-secondary border-opacity-25"
        style={{ backdropFilter: "blur(16px)", background: "rgba(15, 23, 42, .82)" }}
      >
        <div className="container py-2">
          <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#hero">
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-4"
              style={{ width: 38, height: 38, background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
            >
              T
            </span>
            TaskChat
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item"><a className="nav-link" href="#projeto">Projeto</a></li>
              <li className="nav-item"><a className="nav-link" href="#como-funciona">Como funciona</a></li>
              <li className="nav-item"><a className="nav-link" href="#recursos">Recursos</a></li>
              <li className="nav-item"><a className="nav-link" href="#bugs">Relatar bugs</a></li>
              <li className="nav-item"><a className="nav-link" href="#contato">Contato</a></li>
            </ul>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-light rounded-pill px-4" onClick={() => navigate("/login")}>
                Entrar
              </button>
              <button
                className="btn rounded-pill px-4 text-white"
                onClick={() => navigate("/signup")}
                style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
              >
                Registrar-se
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="container py-5 py-lg-5">
        <div className="row align-items-center g-5 py-lg-5">
          <div className="col-lg-6">
            <span className="badge rounded-pill border border-primary border-opacity-50 bg-primary bg-opacity-10 px-3 py-2 mb-4">
              Gestão interna para empresas e equipes
            </span>

            <h1 className="display-4 fw-bold lh-1 mb-4">
              Organize tarefas, equipe e conversas no mesmo ambiente
            </h1>

            <p className="lead text-white-50 mb-4">
              O TaskChat é uma aplicação de gerenciamento de empresas, usuários, tarefas e chat em tempo real.
              Ele ajuda equipes a acompanhar demandas, conversar internamente e manter permissões bem definidas.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <button
                className="btn btn-lg rounded-pill text-white px-4"
                onClick={() => navigate("/signup")}
                style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
              >
                Começar agora
              </button>
              <a href="#projeto" className="btn btn-lg btn-outline-light rounded-pill px-4">
                Entender o projeto
              </a>
            </div>

            <div className="d-flex flex-wrap gap-3 text-white-50 small">
              <span>Chat interno</span>
              <span>Kanban de tarefas</span>
              <span>Permissões por cargo</span>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="rounded-5 border border-secondary border-opacity-25 shadow-lg p-3 p-md-4"
              style={{ background: "rgba(15, 23, 42, .72)", backdropFilter: "blur(18px)" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="rounded-circle bg-danger d-inline-block" style={{ width: 10, height: 10 }} />
                  <span className="rounded-circle bg-warning d-inline-block" style={{ width: 10, height: 10 }} />
                  <span className="rounded-circle bg-success d-inline-block" style={{ width: 10, height: 10 }} />
                </div>
                <span className="small text-white-50">TaskChat Dashboard</span>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="rounded-4 p-3 h-100" style={{ background: "rgba(30,41,59,.85)" }}>
                    <p className="text-uppercase small text-white-50 mb-3">Perfis</p>
                    {["CEO", "Admin", "Usuário"].map((item) => (
                      <div
                        key={item}
                        className="rounded-3 px-3 py-2 mb-2 small"
                        style={{ background: item === "CEO" ? "rgba(99,102,241,.35)" : "transparent" }}
                      >
                        {item}
                      </div>
                    ))}

                    <p className="text-uppercase small text-white-50 mt-4 mb-3">Membros</p>
                    {["Henrique", "Ana", "Lucas"].map((name, index) => (
                      <div key={name} className="d-flex align-items-center gap-2 mb-2 small">
                        <span className={`rounded-circle d-inline-block bg-${index === 2 ? "primary" : "success"}`} style={{ width: 9, height: 9 }} />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="rounded-4 p-3 mb-3" style={{ background: "rgba(30,41,59,.85)" }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong>Quadro de tarefas</strong>
                      <span className="small text-white-50">empresa</span>
                    </div>

                    <div className="row g-2">
                      {["A fazer", "Revisão", "Atrasado"].map((col, idx) => (
                        <div className="col-4" key={col}>
                          <div className="rounded-4 p-2" style={{ background: "rgba(15,23,42,.8)" }}>
                            <p className="small mb-2 text-white-50">{col}</p>
                            {[1, 2, 3].map((n) => (
                              <div
                                key={n}
                                className="rounded-3 mb-2"
                                style={{
                                  height: 12,
                                  background: idx === 2 && n === 1 ? "rgba(239,68,68,.75)" : "rgba(148,163,184,.35)",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="rounded-4 p-3" style={{ background: "rgba(30,41,59,.85)" }}>
                        <span className="small text-white-50">Empresas</span>
                        <h4 className="mb-0">Multiempresa</h4>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="rounded-4 p-3" style={{ background: "rgba(30,41,59,.85)" }}>
                        <span className="small text-white-50">Segurança</span>
                        <h4 className="mb-0">Cookies</h4>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-4 p-3 mt-3" style={{ background: "rgba(99,102,241,.18)" }}>
                    <div className="d-flex align-items-start gap-2">
                      <span className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                        H
                      </span>
                      <div>
                        <strong className="small">Chat interno</strong>
                        <p className="small text-white-50 mb-0">Mensagem em tempo real entre membros da empresa.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projeto" className="container py-5">
        <div className="rounded-5 p-4 p-lg-5 border border-secondary border-opacity-25" style={{ background: "rgba(15,23,42,.62)" }}>
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Projeto</span>
              <h2 className="fw-bold display-6">O que o TaskChat faz</h2>
              <p className="text-white-50 mb-0">
                O projeto resolve a rotina de pequenas equipes que precisam registrar empresa, aprovar membros,
                distribuir tarefas e conversar sem sair do sistema. O backend controla autenticação, permissões e
                isolamento por empresa; o frontend entrega o fluxo visual com páginas de cadastro, dashboard, chat e Kanban.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {workflow.map((item, index) => (
                  <div className="col-md-6" key={item}>
                    <div className="rounded-4 p-3 h-100 border border-secondary border-opacity-25" style={{ background: "rgba(30,41,59,.55)" }}>
                      <span className="small text-primary fw-bold">Passo {index + 1}</span>
                      <p className="mb-0 mt-2 text-white-50">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 720 }}>
          <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Como funciona</span>
          <h2 className="fw-bold display-6">Cada perfil tem acesso ao que precisa</h2>
          <p className="text-white-50">O sistema organiza a empresa em papéis claros para proteger dados e simplificar a operação.</p>
        </div>

        <div className="row g-4">
          {roles.map((role) => (
            <div className="col-md-4" key={role.title}>
              <div className="card h-100 text-white border-secondary border-opacity-25 rounded-5 p-4 shadow-sm hover-card" style={{ background: "rgba(30,41,59,.62)" }}>
                <div className="badge rounded-pill bg-primary bg-opacity-25 border border-primary border-opacity-25 align-self-start mb-3 px-3 py-2">
                  {role.tag}
                </div>
                <h3 className="h4 fw-bold">{role.title}</h3>
                <p className="text-white-50 mb-0">{role.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="recursos" className="container py-5">
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Recursos</span>
            <h2 className="fw-bold display-6">Tudo para organizar o trabalho da empresa</h2>
          </div>
          <div className="col-lg-5">
            <p className="text-white-50 mb-0">Centralize conversas, tarefas, permissões e acompanhamento da equipe em uma única experiência.</p>
          </div>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-md-6 col-lg-4" key={feature.title}>
              <div className="card h-100 text-white border-secondary border-opacity-25 rounded-5 p-4 hover-card" style={{ background: "rgba(15,23,42,.55)" }}>
                <div className="badge rounded-pill bg-primary bg-opacity-10 border border-primary border-opacity-25 align-self-start mb-3 px-3 py-2">
                  {feature.tag}
                </div>
                <h3 className="h5 fw-bold">{feature.title}</h3>
                <p className="text-white-50 mb-0">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tecnologias" className="container py-5">
        <div className="rounded-5 p-4 p-lg-5 border border-secondary border-opacity-25" style={{ background: "rgba(30,41,59,.55)" }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Tecnologias</span>
              <h2 className="fw-bold display-6">Stack usada no projeto</h2>
              <p className="text-white-50 mb-0">Tecnologias utilizadas no desenvolvimento do TaskChat.</p>
            </div>
            <div className="col-lg-7">
              <div className="d-flex flex-wrap gap-3">
                {techs.map((tech) => (
                  <span key={tech} className="badge rounded-pill fs-6 fw-normal px-4 py-3 border border-primary border-opacity-25 bg-primary bg-opacity-10 text-white hover-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-6">
            <div className="h-100 rounded-5 p-4 p-lg-5 border border-secondary border-opacity-25" style={{ background: "rgba(30,41,59,.55)" }}>
              <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Quadro de tarefas</span>
              <h2 className="fw-bold display-6">Status de trabalho</h2>
              <p className="text-white-50">
                O Kanban mostra o estado de cada tarefa. Para usuários comuns, o quadro foca no trabalho essencial:
                tarefas a fazer, tarefas em revisão e tarefas atrasadas.
              </p>
              <div className="d-flex flex-wrap gap-2">
                {taskColumns.map((column) => (
                  <span key={column} className="badge rounded-pill fs-6 fw-normal px-3 py-2 border border-primary border-opacity-25 bg-primary bg-opacity-10 text-white">
                    {column}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div id="bugs" className="col-lg-6">
            <div className="h-100 rounded-5 p-4 p-lg-5 border border-secondary border-opacity-25" style={{ background: "rgba(15,23,42,.72)" }}>
              <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Relatar bugs</span>
              <h2 className="fw-bold display-6">Encontrou um problema?</h2>
              <p className="text-white-50">
                Envie um relato com o que aconteceu, a página onde ocorreu, os passos para reproduzir e, se possível,
                um print ou mensagem de erro.
              </p>
              <a className="btn btn-outline-light rounded-pill px-4" href={`mailto:${contactEmail}?subject=Bug%20no%20TaskChat`}>
                Relatar bug por email
              </a>
              <p className="text-white-50 small mt-3 mb-0">{contactEmail}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="container py-5">
        <div className="rounded-5 p-4 p-lg-5 border border-secondary border-opacity-25" style={{ background: "rgba(30,41,59,.55)" }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="badge rounded-pill text-bg-dark border border-secondary mb-3">Contato</span>
              <h2 className="fw-bold display-6">Fale com o desenvolvedor</h2>
              <p className="text-white-50 mb-0">
                Para dúvidas, sugestões, parcerias ou bugs, use os canais abaixo.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-column gap-3">
                <a className="link-light text-decoration-none rounded-4 p-3 border border-secondary border-opacity-25" href={`mailto:${contactEmail}`} style={{ background: "rgba(15,23,42,.45)" }}>
                  <span className="text-white-50 d-block small">Email</span>
                  {contactEmail}
                </a>
                <a className="link-light text-decoration-none rounded-4 p-3 border border-secondary border-opacity-25" href={linkedInUrl} target="_blank" rel="noreferrer" style={{ background: "rgba(15,23,42,.45)" }}>
                  <span className="text-white-50 d-block small">LinkedIn</span>
                  www.linkedin.com/in/henrique-nassif-19b999256
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="container py-4 border-top border-secondary border-opacity-25">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-white-50 small">
          <span>TaskChat © 2026</span>
          <div className="d-flex gap-4">
            <a className="link-light link-opacity-75-hover text-decoration-none" href={linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="link-light link-opacity-75-hover text-decoration-none" href={`mailto:${contactEmail}`}>Email</a>
            <a className="link-light link-opacity-75-hover text-decoration-none" href="#bugs">Relatar bugs</a>
          </div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        .hover-card, .hover-badge { transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .hover-card:hover { transform: translateY(-6px); border-color: rgba(99,102,241,.7) !important; background: rgba(30,41,59,.8) !important; }
        .hover-badge:hover { transform: translateY(-3px); background: rgba(99,102,241,.25) !important; }
      `}</style>
    </main>
  );
}
