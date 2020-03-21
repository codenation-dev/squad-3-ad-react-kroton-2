import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
        </nav>

        <aside>
          <Profile>
            <div>
              <Link to="/"><strong>Admin Logger</strong></Link>
              Sair do sistema
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
