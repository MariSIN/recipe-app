import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const tamanhoSenha = 6;

function Login() {
  const inputsLogin = {
    email: '',
    senha: '',
  };
  const [inputs, setInputs] = useState(inputsLogin);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailValidation = /\S+@\S+\.\S+/;
    const validationEmail = emailValidation.test(inputs.email);
    const { senha } = inputs;
    if (validationEmail === true && senha.length > tamanhoSenha) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [inputs]);

  const mudarInput = ({ target }) => {
    const { name, value } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const entrar = () => {
    const email = {
      email: inputs.email,
    };
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/meals');
  };
  return (
    <>
      <h1>Login</h1>
      <br />
      <input
        type="text"
        placeholder="Digite seu email"
        data-testid="email-input"
        value={ inputs.email }
        onChange={ mudarInput }
        name="email"
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        data-testid="password-input"
        value={ inputs.senha }
        onChange={ mudarInput }
        name="senha"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
        onClick={ entrar }
      >
        Enter

      </button>

    </>
  );
}

export default Login;
