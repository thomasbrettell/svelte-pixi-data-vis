<div class="panel">
  <p><slot /></p>
</div>

<style>
  .panel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  p {
    background: black;
    color: white;
    padding: 20px;
  }
</style>
