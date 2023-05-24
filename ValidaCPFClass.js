class ValidaCPF {

  constructor(cpf) {
    this.cpf = cpf;
  }

  isValido() {
    if (!this.cpf) return false;
    if (typeof this.cpf !== 'string') return false;

    const numeros = this.cpf.replace(/\D+/g, '');
    if (numeros.length !== 11) return false;
    if (this.isSequencia(numeros)) return false;

    const cpfBase = numeros.slice(0, -2);
    const digito1 = this.comporDigito(cpfBase);
    const digito2 = this.comporDigito(`${cpfBase}${digito1}`);
    const numerosGerados = `${cpfBase}${digito1}${digito2}`;
    return numerosGerados === numeros;
  }

  comporDigito(cpfBase) {
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

  isSequencia(_numeros) {
    const sequencia = _numeros[0].repeat(_numeros.length);
    return sequencia === _numeros;
  }
}


/*********************************************** */
const validador = new ValidaCPF(111);

if (validador.isValido()) {
  console.log(validador.cpf, '=> CPF válido!');
} else {
  console.log(validador.cpf, '=> CPF inválido!');
}
