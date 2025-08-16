import bcrypt from 'bcrypt';

const password = 'admin2025';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Erro ao gerar o hash:', err);
  } else {
    console.log('Senha:', password);
    console.log('Hash gerado:', hash);
  }
});