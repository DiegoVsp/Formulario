let validador = {
  handleSubmit: (e) => {
    e.preventDefault();

    let send = true;
    let inputs = form.querySelectorAll('input')


    validador.clearErrors();
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      let check = validador.checkInput(input)
      if (check !== true) {
        send = false;
        validador.showError(input, check);
      }
    }
    if (send) {
      form.submit();
    }
  },
  checkInput: (input) => {
    // pegando os inputs que tenha o data-rules
    let rules = input.getAttribute('data-rules');
    // caso seja diferente de null
    if (rules !== null) {
      // retira os |
      rules = rules.split('|')
      // verifica cada regra
      for (let regras in rules) {
        let regraDetalhes = rules[regras].split('=')
        switch (regraDetalhes[0]) {
          case 'required':
            if (input.value == '') {
              return 'Campo não pode ser vazio'
            }
            break;
          case 'min':
            if (input.value.length < regraDetalhes[1]) {
              return `Campo deve conter no mínino ${regraDetalhes[1]} caracteres`
            }
            break;
          case 'max':
            if (input.value.length > regraDetalhes[1]) {
              return `Campo deve conter no máximo ${regraDetalhes[1]} caracteres`
            }
            break;
          case 'email':
            if (input.value != '') {
              let regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return `E-mail digitado não é válido`
              }
            }
        }
      }
    }
    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = 'red';

    let erro = document.createElement('div');
    erro.classList.add('error');
    erro.innerHTML = error;

    input.parentElement.insertBefore(erro, input.ElementSibling)
  },

  clearErrors: () => {
    let inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
    }
    let erros = document.querySelectorAll('.error')
    for (let i = 0; i < erros.length; i++) {
      erros[i].remove();
    }
  }
}

let form = document.querySelector('.form-validador');
form.addEventListener('submit', validador.handleSubmit)
