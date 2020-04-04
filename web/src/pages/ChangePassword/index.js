import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory, Link, useLocation } from 'react-router-dom';

import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as Bug } from '../../assets/images/bug-solid.svg';
import { ReactComponent as Eye } from '../../assets/images/eye-solid.svg';
import { ReactComponent as EyeSlash } from '../../assets/images/eye-slash-solid.svg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ChangePassword() {
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const query = useQuery();

  const handleTogglePassword = () => {
    setPassword(!password);
  };

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  async function pwChange(data) {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .min(6, 'Por favor, digite uma senha 6 caracts.')
          .required('Por favor, digite uma senha segura'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/auth/recover/${query.get('token')}`, data);

      const msg = (
        <div>
          <strong>Sua senha foi alterada com sucesso!</strong>
          <br />
          <span>Vá para a página de login para acessar sua conta</span>
        </div>
      );
      toast.success(msg);
    } catch (err) {
      toast.error(
        <div>
          <strong>Houve um problema com o token</strong>{' '}
          <span>
            Por favor, use o link no email recebido e tente novamente.
          </span>
        </div>
      );
    } finally {
      setLoading(false);
      setTimeout(() => history.push('/'), 8000);
    }
  }

  return (
    <section className="auth-page">
      <div className="bg-fade">
        <form className="auth-form" onSubmit={handleSubmit(pwChange)}>
          <header className="form-header">
            <Bug />
          </header>

          <h1 className="form-title">Recupere sua senha</h1>

          <div className="form-divisor">
            <label htmlFor="password">Digite uma nova senha</label>
            <input
              type={password ? 'text' : 'password'}
              name="password"
              id="password"
              ref={register}
              required
            />

            {password ? (
              <EyeSlash onClick={() => handleTogglePassword()} />
            ) : (
              <Eye onClick={() => handleTogglePassword()} />
            )}
          </div>

          <button type="submit">
            {isLoading ? <div className="loader" /> : 'Enviar'}
          </button>

          <div className="form-options">
            <p>
              Voltar para a tela inicial? <Link to="/">Clique aqui.</Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </section>
  );
}

export default ChangePassword;
