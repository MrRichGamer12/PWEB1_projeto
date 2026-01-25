<template>
  <div class="about-page">

    <!-- INTRO -->
    <section class="about-card hero">
      <h1>Sobre o Projeto</h1>
      <p>
        Este projeto foi desenvolvido no âmbito académico com o objetivo de criar
        uma aplicação interativa que incentiva a produtividade, organização e
        evolução pessoal através de gamificação.
      </p>
    </section>

    <!-- OBJETIVO -->
    <section class="about-card">
      <h2>🎯 Objetivo</h2>
      <p>
        A nossa aplicação ajuda os utilizadores a gerir tarefas e atividades,
        recompensando o progresso com experiência, níveis e estatísticas.
        A ideia é transformar o estudo e o trabalho numa experiência motivadora.
      </p>
    </section>

    <!-- FUNCIONALIDADES -->
    <section class="about-card">
      <h2>⚙️ Funcionalidades</h2>
      <ul>
        <li>Sistema de login e registo</li>
        <li>Criação e gestão de atividades</li>
        <li>Sistema de XP, níveis e streaks</li>
        <li>Perfil personalizável com avatar</li>
        <li>Dashboard com progresso e estatísticas</li>
      </ul>
    </section>

    <!-- EQUIPA -->
    <section class="about-card">
      <h2>👥 Equipa</h2>
      <p>
        Este projeto foi desenvolvido por um grupo de estudantes no âmbito da
        unidade curricular de Programação Web.
      </p>

      <div class="team-grid">
        <div class="team-member">
          <div class="avatar-placeholder">👤</div>
          <p>Ricardo Augusto - 40210081</p>
        </div>

        <div class="team-member">
          <div class="avatar-placeholder">👤</div>
          <p>Rodrigo Duarte - 40230095</p>
        </div>
      </div>
    </section>

    <!-- TECNOLOGIAS -->
    <section class="about-card">
      <h2>🛠 Tecnologias Utilizadas</h2>
      <ul>
        <li>Vue.js</li>
        <li>Pinia</li>
        <li>JavaScript</li>
        <li>HTML & CSS</li>
        <li>API REST (JSON Server)</li>
      </ul>
    </section>

  </div>
</template>
<script>
export default {
  name: 'AboutUsView',
}
</script>
<style scoped>
.about-page {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  color: #000;
}

/* CARD BASE */
.about-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

/* HERO */
.hero {
  grid-column: 1 / -1;
}

.hero h1 {
  margin-bottom: 0.6rem;
  font-size: 2rem;
  color: #1db954;
}

/* TITULOS */
.about-card h2 {
  margin-bottom: 0.6rem;
  color: #1db954;
}

/* LISTAS */
.about-card ul {
  padding-left: 1.2rem;
}

.about-card li {
  margin: 0.4rem 0;
}

/* EQUIPA */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.team-member {
  text-align: center;
}

.avatar-placeholder {
  width: 64px;
  height: 64px;
  margin: auto;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

</style>