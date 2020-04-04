import React, { useState, useRef } from 'react';
import * as Yup from 'yup';

import aboutImage from 'images/about-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import StyledForm from 'components/Form/StyledForm';
import Input from 'components/Form/Input';

import api from 'services/api';
import { toast } from 'react-toastify';
import { Container, FormSection, FormContainer } from './styles';

function RecoverPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const formRef = useRef(null);

  async function handleSubmit(data) {
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
      await api.post('/passwords', {
        ...data,
        redirect: `${process.env.REACT_APP_PUBLIC_URL}/resetar-senha`,
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
      setSuccess(msg);
      toast.success(msg);
    } catch (err) {
      const validationErrors = {};
      console.log('err', err);
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error(
          <div>
            <strong>Tem certeza que seu e-mail está correto?</strong>{' '}
            <span>Por favor, verifique o email e tente novamente.</span>
          </div>
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />
      <FormSection>
        <div className="container my-5">
          <div className="row justify-content-md-center align-items-center">
            <div className="col-12 col-md-5">
              <img src={aboutImage} alt="Imagem sobre o projeto" />
            </div>
            <div className="col-12 col-md-5">
              <FormContainer>
                <StyledForm ref={formRef} onSubmit={handleSubmit}>
                  <h1 className="mb-2">Recuperação de conta</h1>
                  <p className="mb-4">
                    Recupere sua conta usando seu e-mail de acesso.
                  </p>
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-mail de acesso"
                  />
                  {success || (
                    <>
                      <Button
                        style={{ width: '100%' }}
                        type="submit"
                        className="my-2"
                        fontWeight="bold"
                        theme="rose"
                        disabled={loading}
                      >
                        {loading ? 'Enviando...' : 'Recuperar'}
                      </Button>
                      <Button
                        className="mb-2"
                        to="/entrar"
                        fontWeight="bold"
                        theme="primary"
                      >
                        Lembrou sua senha?
                      </Button>
                    </>
                  )}
                </StyledForm>
              </FormContainer>
            </div>
          </div>
        </div>
      </FormSection>
      <Footer />
    </Container>
  );
}

export default RecoverPassword;
