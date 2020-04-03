import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Link } from 'react-router-dom';

import { ReactComponent as Bug } from '../assets/images/bug-solid.svg';

import api from '../services/api';

import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);

  const onSubmit = data => {
    setIsLoading(true);
    setErrors({});

    api
      .post('/auth/signUp', data)
      .then(() => {
        setRedirect(true);
      })
      .catch(errors => {
        try {
          const inputErrors = errors.response.data.filter(err => {
            return err.field !== undefined;
          });

          let errorsObj = {};

          for (let i = 0; i < inputErrors.length; i++) {
            errorsObj[inputErrors[i].field] = inputErrors[i].message;
          }

          setErrors(errorsObj);
        } catch (error) {
          toast.error('Erro desconhecido');
        }
      });

    setIsLoading(false);
  };

  return (
    <section className="auth-page">
      <div className="bg-fade">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <header className="form-header">
            <Bug />
          </header>

          <h1 className="form-title">Cadastro</h1>

          <div className="form-divisor">
            <label htmlFor="username">Nome completo</label>
            <input
              type="text"
              name="username"
              id="username"
              ref={register}
              required
            />

            {errors.username && <p>{errors.username}</p>}
          </div>

          <div className="form-divisor">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={register}
              required
            />

            {errors.email && <p>{errors.email}</p>}
          </div>

          <div className="form-divisor">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={register}
              required
            />

            {errors.password && <p>{errors.password}</p>}
          </div>

          <div className="form-divisor">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              ref={register}
              required
            />
          </div>

          <button type="submit">
            {isLoading ? <div className="loader" /> : 'Cadastrar-se'}
          </button>

          <div className="form-options">
            <p>
              Ja possui conta? <Link to="/">Entre agora</Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />

      {redirect && <Redirect to="/?newuser=true" />}
    </section>
  );
};

export default SignUp;
