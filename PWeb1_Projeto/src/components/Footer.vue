<template>
  <footer class="app-footer">
    <div class="footer-content">

      <div class="footer-section">
        <h3>Projeto</h3>
        <p>
          Aplicação de produtividade gamificada desenvolvida no âmbito académico.
        </p>
      </div>

      <div class="footer-section">
        <h3>Equipa</h3>
        <p>
          Projeto desenvolvido por estudantes de Programação Web 1.
        </p>
      </div>

      <div class="footer-section">
        <h3>About Us</h3>
        <RouterLink to="/aboutus">About Us</RouterLink>
      </div>

    </div>

    <div class="footer-bottom">
      © 2026 · Projeto Académico · Todos os direitos reservados
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background-color: #222;
  color: #fff;
  margin-top: 2rem;
  padding-top: 1.5rem;
}

/* CONTEÚDO */
.footer-content {
  max-width: 1100px;
  margin: auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.footer-section h3 {
  margin-bottom: 0.6rem;
  color: #1db954;
}

.footer-section p {
  font-size: 0.9rem;
  opacity: 0.85;
}

.footer-section a {
  display: block;
  color: #FFD700;
  text-decoration: none;
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.footer-section a:hover {
  color: #FFA500;
}

/* RODAPÉ FINAL */
.footer-bottom {
  margin-top: 1.5rem;
  padding: 0.8rem;
  text-align: center;
  font-size: 0.8rem;
  background-color: #1a1a1a;
  opacity: 0.8;
}
</style>
