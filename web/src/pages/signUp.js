import React from "react";

import { ReactComponent as Bug } from "../assets/images/bug-solid.svg";

import "./styles.scss";

const SignUp = () => {
  return (
    <section className="auth-page">
      <div className="bg-fade">
        <form className="auth-form" action="">
          <header className="form-header">
            <Bug />
          </header>

          <h1 className="form-title">Cadastro</h1>

          <label htmlFor="email">E-Mail</label>
          <input type="text" name="email" id="email" />

          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" />

          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />

          <input type="submit" value="Entrar" />

          <div className="form-options">
            <label htmlFor="remember_me" className="custom_checkBox">
              <input type="checkbox" name="remember_me" id="remember_me" />
              <span className="checkmark"></span>
              Lembrar-me
            </label>

            <a href="/">Fazer login.</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
