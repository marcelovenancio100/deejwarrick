function ValidaCPF(cpf) {
  this.cpf = cpf;

  Object.defineProperty(this, 'numeros', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: cpf && typeof cpf === 'string' ? cpf.replace(/\D+/g, '') : undefined
  });
}

ValidaCPF.prototype.isValido = function() {
  if (!this.numeros) return false;
  if (this.numeros.length !== 11) return false;
  if (this.isSequencia()) return false;

  const cpfBase = this.numeros.slice(0, -2);
  const digito1 = this.comporDigito(cpfBase);
  const digito2 = this.comporDigito(`${cpfBase}${digito1}`)
  const numerosGerados = `${cpfBase}${digito1}${digito2}`;
  return numerosGerados === this.numeros;
}

ValidaCPF.prototype.comporDigito = function(cpfBase) {
  const cpfArray = Array.from(cpfBase);
  let regressivo = cpfArray.length + 1;

  const total = cpfArray.reduce((ac, val) => {
    ac += (regressivo * Number(val));
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
}

ValidaCPF.prototype.isSequencia = function() {
  const sequencia = this.numeros[0].repeat(this.numeros.length);
  return sequencia === this.numeros;
}


/*********************************************** */
const validador = new ValidaCPF('111.111.111-11');

if (validador.isValido()) {
  console.log(validador.cpf, '=> CPF válido!');
} else {
  console.log(validador.cpf, '=> CPF inválido!');
}
