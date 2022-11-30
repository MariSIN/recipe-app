import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DRINKS_TOKEN_KEY, MEALS_TOKEN_KEY, USER_KEY } from '../utilit/globalVariables';

const tamanhoSenha = 6;

function Login() {
  const history = useHistory();

  const inputsLogin = {
    email: '',
    senha: '',
  };
  const [inputs, setInputs] = useState(inputsLogin);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    localStorage.setItem(USER_KEY, JSON.stringify({ email: inputs.email }));
    localStorage.setItem(MEALS_TOKEN_KEY, 1);
    localStorage.setItem(DRINKS_TOKEN_KEY, 1);
    history.push('/meals');
  };

  return (
    <>
      <h1>Login</h1>
      <br />

      <form>

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
      </form>

    </>
  );
}

export default Login;
