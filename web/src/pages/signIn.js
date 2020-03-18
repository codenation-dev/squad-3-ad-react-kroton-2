import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ReactComponent as Bug } from '../assets/images/bug-solid.svg';
import { ReactComponent as Eye } from '../assets/images/eye-solid.svg';
import { ReactComponent as EyeSlash } from '../assets/images/eye-slash-solid.svg';

import api from '../services/api';

import './styles.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn = () => {
  const { register, handleSubmit } = useForm();

  const [password, setPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [cookies, setCookie] = useCookies(['jwt']);

  let query = useQuery();

  const handleTogglePassword = () => {
    setPassword(!password);
  };

  const onSubmit = async data => {
    setIsLoading(true);

    api
      .post('/auth/signin', data)
      .then(response => {
        if (data.rememberMe) {
          setCookie('jwt', response.data.token, {
            path: '/',
            maxAge: 31536000
          });
        } else {
          setCookie('jwt', response.data.token, {
            path: '/',
            maxAge: -1
          });
        }

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        setRedirect(true);
      })
      .catch(errors => {
        const inputErrors = errors.response.data.filter(err => {
          return err.field !== undefined;
        });

        let errorsObj = {};

        for (let i = 0; i < inputErrors.length; i++) {
          switch (inputErrors[i].field) {
            case 'email':
              errorsObj[inputErrors[i].field] =
                'E-mail não encontrado ou incorreto';
              break;
            case 'password':
              errorsObj[inputErrors[i].field] = 'Senha incorreta';
              break;
            default:
              errorsObj[inputErrors[i].field] = inputErrors[i].message;
              break;
          }
        }

        setErrors(errorsObj);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    const newUser = query.get('newuser');

    if (newUser) {
      toast.success('Usuario criado com sucesso!');
    }

    if (cookies.jwt) {
      setRedirect(true);
    }
  }, [cookies.jwt, query]);

  return (
    <section className="auth-page">
      <div className="bg-fade">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <header className="form-header">
            <Bug />
          </header>

          <h1 className="form-title">Login</h1>

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
              type={password ? 'text' : 'password'}
              name="password"
              id="password"
              ref={register}
              required
            />

            {errors.password && <p>{errors.password}</p>}

            {password ? (
              <EyeSlash onClick={() => handleTogglePassword()} />
            ) : (
              <Eye onClick={() => handleTogglePassword()} />
            )}
          </div>

          <button type="submit">
            {isLoading ? <div className="loader" /> : 'Entrar'}
          </button>

          <div className="form-options">
            <p>
              Ainda nao tem conta? <a href="/signUp">Cadastre-se</a>
            </p>

            <label htmlFor="rememberMe" className="customCheckBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                ref={register}
              />
              <span className="checkmark"></span>
              Lembrar-me
            </label>
          </div>
        </form>
      </div>

      <ToastContainer />

      {redirect && <Redirect to="/dashboard" />}
    </section>
  );
};

export default SignIn;
