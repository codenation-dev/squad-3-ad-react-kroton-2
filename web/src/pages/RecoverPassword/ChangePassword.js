import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

import aboutImage from 'images/about-image.svg';
import Button from 'components/Button';
import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import StyledForm from 'components/Form/StyledForm';
import Input from 'components/Form/Input';

import api from 'services/api';
import { toast } from 'react-toastify';
import { Container, FormSection, FormContainer } from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const formRef = useRef(null);
  const query = useQuery();

  async function handleSubmit(data) {
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
      await api.put(`/passwords/${query.get('token')}`, data);
      const msg = (
        <div>
          <strong>Sua senha foi alterada com sucesso!</strong>
          <br />
          <span>Vá para a página de login para acessar sua conta</span>
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
            <strong>Houve um problema com o token</strong>{' '}
            <span>
              Por favor, use o link no email recebido e tente novamente.
            </span>
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
                  <p className="mb-4">Coloque sua nova senha de acesso</p>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha de acesso"
                  />
                  {success}
                  {!success ? (
                    <Button
                      style={{ width: '100%' }}
                      type="submit"
                      className="my-2"
                      fontWeight="bold"
                      theme="rose"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Alterar senha'}
                    </Button>
                  ) : (
                    <Button
                      className="mb-2"
                      to="/entrar"
                      fontWeight="bold"
                      theme="primary"
                    >
                      Acessar sua conta
                    </Button>
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

export default ChangePassword;
