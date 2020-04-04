import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as Bug } from '../../assets/images/bug-solid.svg';

function RecoverPassword() {
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  async function pwRecovery(data) {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required('Por favor, digite o seu email'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      await api.post('/auth/recover', {
        ...data,
        redirect: `http://localhost:3000/change`,
      });
      const msg = (
        <div>
          <strong>Encontramos seu email!</strong>
          <br />
          <span>
            Por favor, verifique sua caixa de entrada para trocar a sua senha
          </span>
        </div>
      );
      toast.success(msg);
    } catch (err) {
      toast.error(
        <div>
          <strong>Tem certeza que seu e-mail está correto?</strong>{' '}
          <span>Por favor, verifique o email e tente novamente.</span>
        </div>
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="bg-fade">
        <form className="auth-form" onSubmit={handleSubmit(pwRecovery)}>
          <header className="form-header">
            <Bug />
          </header>

          <h1 className="form-title">Recupere sua senha</h1>

          <div className="form-divisor">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={register}
              required
            />
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

export default RecoverPassword;
